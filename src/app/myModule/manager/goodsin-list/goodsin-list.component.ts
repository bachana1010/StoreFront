import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { PaginatedGoodsin, managerGoodSin } from '../../../interfaces/goodsin1';
import { GoodsinService } from '../../../services/goodsin.service';
import { managerGoodSinApi, managerGoodSin,PaginatedManagerGoodSin} from 'src/app/interfaces/managerlist';

@Component({
  selector: 'app-goodsin-list',
  templateUrl: './goodsin-list.component.html',
  styleUrls: ['./goodsin-list.component.scss']
})
export class GoodsinListComponent implements OnInit {
  managerGoodsin: managerGoodSin[] = []; 
  totalCount: number = 0;

  pageSize: number = 5;
  pageNumber: number = 1;

  constructor(
    private router: Router,
    private goodsinService: GoodsinService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.pageNumber = Number(params.get('pageNumber')) || 1;
      this.pageSize = Number(params.get('pageSize')) || 5;
      this.loadGoodsinData();
    });
  }

  loadGoodsinData() {
    this.goodsinService.getGoodSin(this.pageNumber, this.pageSize).subscribe((response: any) => {
      console.log('Data received from server: ', response);
      this.managerGoodsin = response.results;  
      this.totalCount = response.totalCount; 
      console.log(this.managerGoodsin);
    });
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

  // Include additional methods as per your requirements
}
