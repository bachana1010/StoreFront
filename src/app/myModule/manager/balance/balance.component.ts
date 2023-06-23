import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { managerProduct, managerProductApiResponse, PaginatedManagerProduct } from '../../../interfaces/managerlist';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

  managerProduct: managerProduct[] = []; 
  totalCount: number = 0;

  pageSize: number = 5;
  pageNumber: number = 1;

  constructor(private router: Router,
              private productService: ProductService,
              private route: ActivatedRoute) { }


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
      this.managerProduct = response.results;  
      this.totalCount = response.totalCount;
      console.log(this.managerProduct);
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
