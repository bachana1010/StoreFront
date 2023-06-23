import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Products, ProductsAddApiResponse } from '../../../interfaces/products';
// import { managerProduct, managerProductApiResponse, PaginatedManagerProduct } from '../../../interfaces/managerlist';

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

  constructor(private router: Router,
              private productService: ProductService,
              private route: ActivatedRoute) {
                this.userRole = localStorage.getItem('UserRole') || '';
              }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.pageNumber = Number(params.get('pageNumber')) || 1;
      this.pageSize = Number(params.get('pageSize')) || 5;
      this.loadData();
    });
  }

  loadData() {
    this.productService.getProducts(this.pageNumber, this.pageSize).subscribe((response: any) => {
      console.log('New response: ', response);
      this.ProductData = response.results;  
      this.totalCount = response.totalCount;
      console.log(this.ProductData);
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

}
