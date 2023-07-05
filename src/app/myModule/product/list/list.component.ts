import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Products, ProductsAddApiResponse } from '../../../interfaces/products';
import { ProductFilter } from '../../../interfaces/products';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  ProductData: Products[] = []; 
  totalCount: number = 0;
  userRole: string;

  pageSize: number = 5;
  pageNumber: number = 1;

  filter: ProductFilter = {
    name: '',
    priceOperator: '',
    priceValue: 0,
    quantityOperator: '',
    quantityValue: 0
  };

  myForm: FormGroup | any;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.userRole = localStorage.getItem('UserRole') || '';
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: '',
      priceOperator: '',
      priceValue: '',
      quantityOperator: '',
      quantityValue: ''
    })  

    this.route.queryParamMap.subscribe(params => {
      this.pageNumber = Number(params.get('pageNumber')) || 1;
      this.pageSize = Number(params.get('pageSize')) || 5;
      this.loadData();
    });
  }

  loadData() {
    this.productService.getProducts(this.filter, this.pageNumber, this.pageSize).subscribe((response: any) => {
      console.log('New response: ', response);
      this.ProductData = response.results;  
      this.totalCount = response.totalCount;
      console.log(this.ProductData);
    },
    error => {

      console.log("An error occurred: ", error);
      if (error.status === 404) { 
        alert('No results found');
        this.myForm.reset()
        
      }
    });
  }
  

  changePage(newPageNumber: number) {
    if ((newPageNumber - 1) * this.pageSize < this.totalCount) {
      this.pageNumber = newPageNumber;
      this.router.navigate([], { queryParams: { pageNumber: this.pageNumber, pageSize: this.pageSize }, queryParamsHandling: 'merge' });
      this.loadData();
    }
  }

  isFirstPage(): boolean {
    return this.pageNumber === 1;
  }

  isLastPage(): boolean {
    return this.pageNumber >= Math.ceil(this.totalCount / this.pageSize);
  }

  //filters
  applyFilter() {
    this.filter = this.myForm.value;
    this.router.navigate([], { 
      queryParams: { 
        pageNumber: this.pageNumber, 
        pageSize: this.pageSize, 
        name: this.filter.name, 
        priceOperator: this.filter.priceOperator, 
        priceValue: this.filter.priceValue,
        quantityOperator: this.filter.quantityOperator,
        quantityValue: this.filter.quantityValue
      }, 
      queryParamsHandling: 'merge' 
    });
    // this.loadData();
  }

  clearFilter() {
    this.myForm.reset();
    this.filter = {
      name: '',
      priceOperator: '',
      priceValue: 0,
      quantityOperator: '',
      quantityValue: 0
    };
    this.loadData();
  }
}
