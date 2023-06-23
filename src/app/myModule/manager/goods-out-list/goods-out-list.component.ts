import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { managerGoodSOut, managerGoodSOutApi } from '../../../interfaces/managerlist';
import { GoodsOutService } from 'src/app/services/goodsout.service';

@Component({
  selector: 'app-goods-out-list',
  templateUrl: './goods-out-list.component.html',
  styleUrls: ['./goods-out-list.component.scss']
})

export class GoodsOutListComponent implements OnInit {
  managerGoodsOut: managerGoodSOut[] = [];
  totalCount: number = 0;

  pageSize: number = 5;
  pageNumber: number = 1;

  constructor(
    private router: Router,
    private goodsOutService: GoodsOutService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.pageNumber = Number(params.get('pageNumber')) || 1;
      this.pageSize = Number(params.get('pageSize')) || 5;
      this.loadGoodsOutData();
    });
  }

  loadGoodsOutData() {
    this.goodsOutService.getGoodSOut(this.pageNumber, this.pageSize).subscribe((response: any) => {
      console.log('Data received from server: ', response);
      this.managerGoodsOut = response.results;  
      this.totalCount = response.totalCount; 
      console.log(this.managerGoodsOut);
    });
  }

  changePage(newPageNumber: number) {
    if ((newPageNumber - 1) * this.pageSize < this.totalCount) {
      this.pageNumber = newPageNumber;
      this.router.navigate([], { queryParams: { pageNumber: this.pageNumber, pageSize: this.pageSize }, queryParamsHandling: 'merge' });
      this.loadGoodsOutData();
    }
  }

  isFirstPage(): boolean {
    return this.pageNumber === 1;
  }

  isLastPage(): boolean {
    return this.pageNumber >= Math.ceil(this.totalCount / this.pageSize);
  }}