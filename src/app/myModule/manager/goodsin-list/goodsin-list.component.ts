import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoodsinService,  } from '../../../services/goodsin.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GoodsinAdd, GoodsinAddApiResponse} from '../../../interfaces/goodsin1';
import {GoodsinFilter } from '../../../interfaces/goodsin1';

@Component({
  selector: 'app-goodsin-list',
  templateUrl: './goodsin-list.component.html',
  styleUrls: ['./goodsin-list.component.scss']
})
export class GoodsinListComponent implements OnInit {
  managerGoodsin: GoodsinAdd[] = []; 
  totalCount: number = 0;

  pageSize: number = 5;
  pageNumber: number = 1

  filter: GoodsinFilter = {
    quantity: undefined,
    quantityOperator: undefined,
    entryDate: undefined,
    dateTo: undefined
  };

  filterForm: FormGroup | any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private goodsinService: GoodsinService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log(this.managerGoodsin)
    this.filterForm = this.fb.group({
      quantity: [''],
      quantityOperator: [''],
      entryDate: [''],
      dateFrom: [''],
      dateTo: ['']
    });

    this.route.queryParamMap.subscribe(params => {
      this.pageNumber = Number(params.get('pageNumber')) || 1;
      this.pageSize = Number(params.get('pageSize')) || 5;
      this.filter.quantity = Number(params.get('quantity')) || undefined;
      this.filter.quantityOperator = params.get('quantityOperator') || undefined;
      this.filter.entryDate = params.get('entryDate') || undefined;
      this.filter.dateFrom = params.get('dateFrom') || undefined;
      this.filter.dateTo = params.get('dateTo') || undefined;

      this.loadGoodsinData();
    });
  }

  loadGoodsinData() {
    this.goodsinService.getGoodSin(this.filter, this.pageNumber, this.pageSize).subscribe(
      (response: any) => {
        console.log('Data received from server: ', response);
        this.managerGoodsin = response.results;
        this.totalCount = response.totalCount;
        console.log(this.managerGoodsin);
    
        if (!this.managerGoodsin || this.managerGoodsin.length === 0) {
          window.alert('No results found.');
        }
      },
      (error) => {
        console.log('An error occurred: ', error);
    
        if (error.status === 404) {
          window.alert('No results found. Error. Fetching all data again.');
          
          this.filterForm.reset();
          this.filter = {
            quantity: undefined,
            quantityOperator: undefined,
            entryDate: undefined,
            dateFrom: undefined,
            dateTo: undefined
          };
    
          this.router.navigate([], { 
            queryParams: { 
              pageNumber: 1, 
              pageSize: this.pageSize
            }
          });
  
          this.loadGoodsinData();
        }
      }
    );
  }
  
  

  changePage(newPageNumber: number) {
    if ((newPageNumber - 1) * this.pageSize < this.totalCount) {
      this.pageNumber = newPageNumber;
      this.router.navigate([], { queryParams: { pageNumber: this.pageNumber, pageSize: this.pageSize }, queryParamsHandling: 'merge' });
      this.loadGoodsinData();
    }
  }

  isFirstPage(): boolean {
    return this.pageNumber === 1;
  }

  isLastPage(): boolean {
    return this.pageNumber >= Math.ceil(this.totalCount / this.pageSize);
  }

  applyFilter(): void {
    console.log(this.filterForm)
    this.filter = this.filterForm.value;
    this.router.navigate([], { 
      queryParams: { 
        pageNumber: this.pageNumber, 
        pageSize: this.pageSize, 
        quantity: this.filter.quantity,
        quantityOperator: this.filter.quantityOperator,
        entryDate: this.filter.entryDate,
        dateFrom: this.filter.dateFrom,
        dateTo: this.filter.dateTo
      }, 
      queryParamsHandling: 'merge' 
    });
    // this.loadGoodsinData();
  }

  clearFilter(): void {
    this.filterForm.reset();
    this.filter = {
      quantity: undefined,
      quantityOperator: undefined,
      entryDate: undefined,
      dateFrom: undefined,
      dateTo: undefined
    };
    this.router.navigate([], { 
      queryParams: { 
        pageNumber: this.pageNumber, 
        pageSize: this.pageSize
      }
    });
    // this.loadGoodsinData();
  }
}
