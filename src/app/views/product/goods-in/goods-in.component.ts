import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GetBranch,BranchApiResponse } from 'src/interfaces/branch';
import { BranchService } from 'src/services/branch.service';
import { UserService } from 'src/services/user.service';
import { GoodsinService } from 'src/services/goodsin.service';

export interface GoodsinAdd {
  barcode: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
}

export type GoodsinAddApiResponse = GoodsinAdd[];

@Component({
  selector: 'app-goods-in',
  templateUrl: './goods-in.component.html',
  styleUrls: ['./goods-in.component.scss']
})


export class GoodsInComponent {
  myForm: FormGroup | any;
  branches: GetBranch[] = []
  branchesName: [] = []

  constructor(
    private fb: FormBuilder, 
    private userService: UserService,
    private branchService: BranchService,
    private goodsinService: GoodsinService,
    private snackBar: MatSnackBar
    
    ) { }

    ngOnInit(): void {

      // this.getBranches();
      
      this.myForm = this.fb.group({
        barcode: ["", [Validators.required]],
        name: ["", Validators.required],
        price: ["", Validators.required],
        unit: ["", Validators.required],
        quantity: ["", Validators.required],
      })    
    }
  
    
    addBarcode(form: FormGroup): void {  // Changed from form: FormGroup to data: AddUsers
      console.log(form.value)

      this.goodsinService.addGoodsin(form.value).subscribe((res) => {

        console.log("pasuxi", res)
        console.log(form.value);
        this.myForm.reset();
        // Show snackbar here
      this.snackBar.open(res.message, 'Close', {
        duration: 3000,  // duration in milliseconds

      });
      })
    }
  
    onPaste(event: ClipboardEvent) {
      let pastedText = event.clipboardData?.getData('text');
    
      if (pastedText) {
        this.goodsinService.getBarcode(pastedText)
          .subscribe(
            (data) => {
              if (data) {
                this.myForm.patchValue({
                  name: data.name,
                  price: data.price,
                  unit: data.unit,
                  quantity: data.quantity
                });
              }
            },
            (error) => {
              // Handle error, maybe display message to user
            }
          );
      }
    }
    
    
}
