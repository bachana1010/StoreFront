import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
// import { Users, UserApiResponse } from 'src/interfaces/users';
import { GetBranch, BranchApiResponse } from '../../../interfaces/branch';

import { BranchService } from '../../../services/branch.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  BranchesData: GetBranch[] = [];
  username: any = ''

  constructor(private router: Router,
              private branchService: BranchService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.username = localStorage.getItem('username');

    this.route.data.subscribe((data: any) => {
      this.BranchesData = data.branches;
      console.log(this.BranchesData, "resorveridan");
    });
    
    

    // this.loadBranchData()
  }

  loadBranchData() {

    this.branchService.getBranches().subscribe((response: BranchApiResponse) => {
      console.log('esaa axali responsi', response);

      this.BranchesData = response;  
      console.log(this.BranchesData);
    });
  }

  navigateToUpdate(userId: number) {
    this.router.navigate(['/branch/update', userId]);
  }

  deleteUser(item: any): void {
    console.log(item);  // Add this line to check if `item` is correctly passed
    if (confirm("Are you sure to delete " + item.username + "?")) {
      this.branchService.deleteBranch(item.id).subscribe(response => {
        this.loadBranchData();
        console.log(response);
      });
    }
  
  






  }

}
