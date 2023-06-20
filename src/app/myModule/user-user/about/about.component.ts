import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Users, UserApiResponse } from '../../../interfaces/users';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnInit {
  UsersData: Users[] = [];
  totalCount: number = 0;

  pageSize: number = 5;
  pageNumber: number = 1

  constructor(
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // When the component is initialized, we get the page number and size from the query parameters
    this.route.queryParamMap.subscribe(params => {
      this.pageNumber = Number(params.get('pageNumber')) || 1;
      this.pageSize = Number(params.get('pageSize')) || 5;
      this.loadData();
    });
  }

  loadData() {
    this.userService.getUsers(this.pageNumber, this.pageSize).subscribe(response => {
      console.log("Data received from server: ", response);
      this.UsersData = response.users;
      this.totalCount = response.totalCount; // changed TotalCount to totalCount

      console.log("UsersData: ", this.UsersData);
      console.log("Total count: ", this.totalCount);
    });
}




  changePage(newPageNumber: number) {
    console.log("Change page function called with: ", newPageNumber);
    if ((newPageNumber >= 1) && (newPageNumber <= Math.ceil(this.totalCount / this.pageSize))) {
      this.pageNumber = newPageNumber;
      this.loadData();
    }
}


  isFirstPage(): boolean {
    return this.pageNumber === 1;
  }

  isLastPage(): boolean {
    return this.pageNumber >= Math.ceil(this.totalCount / this.pageSize);
  }

  navigateToUpdate(userId: number) {
    this.router.navigate(['/user/update', userId]);
  }

  deleteUser(item: any): void {
    if (confirm("Are you sure to delete " + item.username + "?")) {
      this.userService.deleteUser(item.id).subscribe(response => {
        this.changePage(this.pageNumber);
      });
    }
  }
}
