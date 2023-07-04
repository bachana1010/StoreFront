import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoodsOutService } from '../../../services/goodsout.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { managerGoodSOut } from '../../../interfaces/managerlist';
import { GoodsoutFilter } from '../../../interfaces/goodsout';

@Component({
  selector: 'app-goods-out-list',
  templateUrl: './goods-out-list.component.html',
  styleUrls: ['./goods-out-list.component.scss']
})
export class GoodsOutListComponent implements OnInit {
  managerGoodsout: managerGoodSOut[] = []; 
  totalCount: number = 0;

  pageSize: number = 5;
  pageNumber: number = 1;

  filter: GoodsoutFilter = {
    quantityValue: undefined,
    quantityOperator: undefined,
    outDate: undefined,
    dateTo: undefined
  };

  filterForm: FormGroup | any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private goodsOutService: GoodsOutService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log(this.managerGoodsout);
    this.filterForm = this.fb.group({
      quantityValue: [''],
      quantityOperator: [''],
      outDate: [''],
      dateFrom: [''],
      dateTo: ['']
    });

    this.route.queryParamMap.subscribe(params => {
      this.pageNumber = Number(params.get('pageNumber')) || 1;
      this.pageSize = Number(params.get('pageSize')) || 5;
      this.filter.quantityValue = Number(params.get('quantityValue')) || undefined;
      this.filter.quantityOperator = params.get('quantityOperator') || undefined;
      this.filter.outDate = params.get('outDate') || undefined;
      this.filter.dateTo = params.get('dateTo') || undefined;

      this.loadGoodsOutData();
    });
  }

  loadGoodsOutData() {
    this.goodsOutService.getGoodSOut(this.filter, this.pageNumber, this.pageSize).subscribe(
      (response: any) => {
        console.log('Data received from server: ', response);
        this.managerGoodsout = response.results;
        this.totalCount = response.totalCount;
        console.log(this.managerGoodsout);
  
        if (!this.managerGoodsout || this.managerGoodsout.length === 0) {
          window.alert('No results found.');
        }
      },
      (error) => {
        console.log('An error occurred: ', error);
  
        if (error.status === 404) {
          window.alert('No results found. Error. Fetching all data again.');
  
          this.filterForm.reset();
          this.filter = {
            quantityValue: undefined,
            quantityOperator: undefined,
            outDate: undefined,
            dateTo: undefined,
            dateFrom:undefined
          };
  
          this.router.navigate([], { 
            queryParams: { 
              pageNumber: 1, 
              pageSize: this.pageSize
            }
          });
  
          this.loadGoodsOutData();
        }
      }
    );
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
  }

  applyFilter(): void {
    console.log(this.filterForm);
    this.filter = this.filterForm.value;
    this.router.navigate([], { 
      queryParams: { 
        pageNumber: this.pageNumber, 
        pageSize: this.pageSize, 
        quantityValue: this.filter.quantityValue,
        quantityOperator: this.filter.quantityOperator,
        outDate: this.filter.outDate,
        dateFrom: this.filter.dateFrom,

        dateTo: this.filter.dateTo
      }, 
      queryParamsHandling: 'merge' 
    });
    this.loadGoodsOutData();
  }

  clearFilter(): void {
    this.filterForm.reset();
    this.filter = {
      quantityValue: undefined,
      quantityOperator: undefined,
      outDate: undefined,
      dateTo: undefined,
      dateFrom:undefined

    };

    this.router.navigate([], { 
      queryParams: { 
        pageNumber: this.pageNumber, 
        pageSize: this.pageSize
      }
    });
    this.loadGoodsOutData();
  }
}
