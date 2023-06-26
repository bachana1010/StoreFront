import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Users, UserApiResponse } from '../../../interfaces/users';
import { UserFilter } from '../../../interfaces/userfilter';
import { FormBuilder, FormGroup } from '@angular/forms';


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

  filter: UserFilter = {
    username: '',
    email: '',
    role: ''
  };

  constructor(
    private fb: FormBuilder, 

    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  myForm: FormGroup | any;

  ngOnInit(): void {
    this.myForm = this.fb.group({
      email: '',
      username: '',
      role: '',
    })    
  
    this.route.data.subscribe((data: any) => {
      console.log(data.users);
      this.UsersData = data.users.users;
      this.totalCount = data.users.totalCount; 
      console.log("resolved data")
    });

    this.route.queryParamMap.subscribe(params => {
      this.pageNumber = Number(params.get('pageNumber')) || 1;
      this.pageSize = Number(params.get('pageSize')) || 5;
      this.loadData();
    });
  }

  loadData() {
    this.userService.getUsers(this.filter, this.pageNumber, this.pageSize).subscribe(
      response => {
        console.log("Data received from server: ", response);
        this.UsersData = response.users;
        this.totalCount = response.totalCount; 
        console.log("UsersData: ", this.UsersData);
        console.log("Total count: ", this.totalCount);
      },
      error => {
        console.log("An error occurred: ", error);
        alert('No results found');
        this.clearFilter();
      }
    );
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

  //filtrebi

  applyFilter() {
  this.filter = this.myForm.value;
  this.router.navigate([], { 
    queryParams: { 
      pageNumber: this.pageNumber, 
      pageSize: this.pageSize, 
      role: this.filter.role, 
      email: this.filter.email, 
      username: this.filter.username 
    }, 
    queryParamsHandling: 'merge' 
  });
}

  

  clearFilter() {
    this.myForm.reset();
    this.filter = {
      username: '',
      email: '',
      role: ''
    };
    this.loadData();
  }
}
