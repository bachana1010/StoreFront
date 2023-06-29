import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BranchService } from '../../../services/branch.service';
import { GetBranch, BranchApiResponse } from '../../../interfaces/branch';
import { BranchFilter } from '../../../interfaces/branchfilter';

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

  filter: BranchFilter = {
    BrancheName: '',
    addedByUserName: ''
  };

  myForm: FormGroup | any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private branchService: BranchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      branch: [''], 

      addedByUserName: ['']
    });
    

    this.route.data.subscribe((data: any) => {
      this.BranchesData = data.branches.branches;
      this.totalCount = data.branches.totalCount;
    });

    this.route.queryParamMap.subscribe(params => {
      this.pageNumber = Number(params.get('pageNumber')) || 1;
      this.pageSize = Number(params.get('pageSize')) || 5;
      this.filter.BrancheName = params.get('branchName') || '';
      this.filter.addedByUserName = params.get('addedByUserName') || '';
      this.loadBranchData();
    });
  }

  loadBranchData() {
    this.branchService.getBranches(this.filter, this.pageNumber, this.pageSize).subscribe(
      response => {
        this.BranchesData = response.branches;
        this.totalCount = response.totalCount;
      },
      error => {
        console.log('An error occurred: ', error);
        alert('No results found');
        this.clearFilter();
      }
    );
  }
  


onPageChange(newPageNumber: number) {
  if ((newPageNumber - 1) * this.pageSize < this.totalCount) {
    this.pageNumber = newPageNumber;
    this.router.navigate([], { 
      queryParams: { 
        pageNumber: this.pageNumber, 
        pageSize: this.pageSize, 
        branchName: this.filter.BrancheName,
        addedByUserName: this.filter.addedByUserName 
      }, 
      queryParamsHandling: 'merge' 
    });
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

  deleteBranch(branch: GetBranch) {
    this.branchService.deleteBranch(branch.id).subscribe(
      () => {
        // Success response handler
        console.log(`Branch with id ${branch.id} deleted successfully.`);
        this.loadBranchData();
      },
      error => {
        // Error response handler
        console.log(`Error occurred while deleting branch: ${error}`);
      }
    );
  }



  applyFilter() {
    this.filter = this.myForm.value;
    this.router.navigate([], { 
      queryParams: { 
        pageNumber: this.pageNumber, 
        pageSize: this.pageSize, 
        BrancheName: this.filter.BrancheName, 
        addedByUserName: this.filter.addedByUserName
      }, 
      queryParamsHandling: 'merge' 
    });
  }
  
  
  
  

  clearFilter() {
    this.myForm.reset();
    this.filter = {
      BrancheName: '',
      addedByUserName: ''
    };
    this.loadBranchData();
  }
}

