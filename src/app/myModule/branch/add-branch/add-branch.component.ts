import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddBranch } from '../../../interfaces/branch';
import { BranchService } from '../../../services/branch.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';



@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.scss']
})
export class AddBranchComponent implements OnInit {

  myForm: FormGroup | any;
  branchesName: [] = []
  message: string = '';  
  showMessage: boolean = false;  

  constructor(private fb: FormBuilder, 
    private branchService: BranchService,
    private snackBar: MatSnackBar,
    private router: Router) { }

    ngOnInit(): void {


    this.myForm = this.fb.group({
      branchName: ["", Validators.required],

    })   
  }

 addBranch(form: FormGroup): void {  
    this.branchService.AddBranch(form.value).subscribe((res) => {
      console.log("Response", res);
      this.message = res.message;  
      this.myForm.reset();

      this.showMessage = true;
      setTimeout(() => this.showMessage = false, 3000);  
      this.router.navigateByUrl('/branch') 

    });
  }
    
  }


  