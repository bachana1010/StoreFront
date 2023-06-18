import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddBranch } from '../../../interfaces/branch';
import { BranchService } from '../../../services/branch.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.scss']
})
export class AddBranchComponent implements OnInit {

  myForm: FormGroup | any;
  branchesName: [] = []

  constructor(private fb: FormBuilder, 
    private branchService: BranchService,
    private snackBar: MatSnackBar) { }

    ngOnInit(): void {


    this.myForm = this.fb.group({
      branchName: ["", Validators.required],

    })   
  }

  addBranch(form: FormGroup): void {  // Changed from form: FormGroup to data: AddUsers
    console.log(form.value)

    this.branchService.AddBranch(form.value).subscribe((res) => {
      console.log("pasuxi", res)
      this.myForm.reset();
      // Show snackbar here
      
    this.snackBar.open(res.message, 'Close', {
      duration: 3000,  // duration in milliseconds
    });
    })
  }
}

