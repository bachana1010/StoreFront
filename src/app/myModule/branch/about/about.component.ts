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
    Username: ''
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
      BrancheName: [''],
      Username: ['']
    });

    this.route.data.subscribe((data: any) => {
      this.BranchesData = data.branches.branches;
      this.totalCount = data.branches.totalCount;
    });

    this.route.queryParamMap.subscribe(params => {
      this.pageNumber = Number(params.get('pageNumber')) || 1;
      this.pageSize = Number(params.get('pageSize')) || 5;
      this.filter.BrancheName = params.get('BrancheName') || '';
      this.filter.Username = params.get('Username') || '';
    });

    // this.loadBranchData(); 
  }

  loadBranchData() {
    this.branchService.getBranches(this.filter, this.pageNumber, this.pageSize).subscribe(
      response => {
        if (response.branches.length === 0) {
          console.log('No results found');
          alert('No results found');

          this.clearFilter();
        } else {
          this.BranchesData = response.branches;
          this.totalCount = response.totalCount;
        }
      },
      error => {
        console.log('An error occurred: ', error);
        alert('An error occurred while fetching branches.');
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
          BranchName: this.filter.BrancheName,
          Username: this.filter.Username
        }, 
        queryParamsHandling: 'merge' 
      });
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
    if (confirm("Are you sure to delete branch with id " + branch.brancheName + "?")) {
      this.branchService.deleteBranch(branch.id).subscribe(
        () => {
          console.log(`Branch with id ${branch.id} deleted successfully.`);
          this.loadBranchData();
        },
        error => {
          console.log(`Error occurred while deleting branch: ${error}`);
        }
      );
    }
  }
  

  applyFilter() {
    this.filter = this.myForm.value;
    this.router.navigate([], { 
      queryParams: { 
        pageNumber: this.pageNumber, 
        pageSize: this.pageSize, 
        BrancheName: this.filter.BrancheName, 
      }, 
      queryParamsHandling: 'merge' 
    });
    this.loadBranchData();
  }
  

  clearFilter() {
    this.myForm.reset();
    this.filter = {
      BrancheName: '',
      Username: ''
    };
    this.loadBranchData(); 
  }
}
