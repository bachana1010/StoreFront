import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetBranch, BranchApiResponse } from '../../../interfaces/branch';
import { BranchService } from '../../../services/branch.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  BranchesData: GetBranch[] = [];
  totalCount: number = 0;

  pageSize: number = 5;
  pageNumber: number = 1;
  username: string = '';

  constructor(
    private router: Router,
    private branchService: BranchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';

    this.route.data.subscribe((data: any) => {
      this.BranchesData = data.branches.branches;
      console.log("Resorveidan es")
    });
    
    
    
    
    
    this.route.queryParamMap.subscribe(params => {
      this.pageNumber = Number(params.get('pageNumber')) || 1;
      this.pageSize = Number(params.get('pageSize')) || 5;
      this.loadBranchData();
    });
  }

  loadBranchData() {
    this.branchService.getBranches(this.pageNumber, this.pageSize).subscribe(response => {
      console.log('Data received from server: ', response);
      this.BranchesData = response.branches;
      this.totalCount = response.totalCount; 

      console.log("BranchesData: ", this.BranchesData);
      console.log("Total count: ", this.totalCount);
    });
  }

  changePage(newPageNumber: number) {
    if ((newPageNumber - 1) * this.pageSize < this.totalCount) {
      this.pageNumber = newPageNumber;
      this.router.navigate([], { queryParams: { pageNumber: this.pageNumber, pageSize: this.pageSize }, queryParamsHandling: 'merge' });
      this.loadBranchData();
    }
  }

  isFirstPage(): boolean {
    return this.pageNumber === 1;
  }

  isLastPage(): boolean {
    return this.pageNumber >= Math.ceil(this.totalCount / this.pageSize);
  }

  navigateToUpdate(branchId: number) {
    this.router.navigate(['/branch/update', branchId]);
  }

  deleteBranch(item: any): void {
    console.log(item);
    if (confirm("Are you sure to delete " + item.brancheName + "?")) {
      this.branchService.deleteBranch(item.id).subscribe(response => {
        this.changePage(this.pageNumber);
        console.log(response);
      });
    }
  }
}
