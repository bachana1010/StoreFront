import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { AddUsers } from '../../../interfaces/users';
import { BranchService } from '../../../services/branch.service';
import { GetBranch } from '../../../interfaces/branch';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  myForm: FormGroup | any;
  branches: GetBranch[] = [];
  message: string = '';  
  showMessage: boolean = false;
  audio = new Audio();

  constructor(
    private fb: FormBuilder, 
    private userService: UserService,
    private branchService: BranchService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadBranches();

    this.myForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      userName: ["", Validators.required],
      password: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      role: ["", Validators.required],
      branchId: [null],
    });
  }

  loadBranches(): void {
    this.branchService.getBranches({}, 1, 5).subscribe(
      (res) => this.branches = res.branches,
      (err) => console.error(err)
    );
  }

  generatePassword(): void {
    const length = 8;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    this.myForm.controls['password'].setValue(retVal);
  }
  
  addUser(data: AddUsers): void {
    this.userService.AddUser(data).subscribe((res) => {
      console.log("Response", res);
      console.log("Submitted data", data);
      this.message = res.message;  
      this.myForm.reset();
  
      this.showMessage = true;
      setTimeout(() => this.showMessage = false, 5000); 
      this.router.navigateByUrl('/user') 
    });
  }
  
  onFormSubmit(form: FormGroup): void {
    if (form.valid) {
      // this.playClickSound();
      this.addUser(form.value);
    }
  }


  playClickSound(): void {
    this.audio.src = "/assets/add-user.mp3";
    this.audio.load();
    this.audio.play();
  }
}
