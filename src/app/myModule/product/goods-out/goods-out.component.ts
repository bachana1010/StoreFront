import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { UserService } from '../../../services/user.service';
import { GoodsOutService } from '../../../services/goodsout.service';
import { GetBranch } from '../../../interfaces/branch';
import { BranchService } from '../../../services/branch.service';
import { ToastrService } from 'ngx-toastr';
import { GoodsinService } from '../../../services/goodsin.service';

export interface GoodsOut {
  barcode: string;

  quantity: number;
}

export type GoodsinAddApiResponse = GoodsOut[];

@Component({
  selector: 'app-goods-out',
  templateUrl: './goods-out.component.html',
  styleUrls: ['./goods-out.component.scss']
})
export class GoodsOutComponent implements OnInit  {
  isInputDisabled: boolean = true;

  myForm: FormGroup | any;
  branches: GetBranch[] = []
  branchesName: [] = []

  constructor(
    private fb: FormBuilder, 
    private userService: UserService,
    private branchService: BranchService,
    private goodsOutService: GoodsOutService,
    private snackBar: MatSnackBar,
    private toastr: ToastrService,
    private goodsinService: GoodsinService,

    
    ) { }

    ngOnInit(): void {
      
      this.myForm = this.fb.group({
        barcode: ["", [Validators.required]],
        quantity: ["", Validators.required],
        name: [{value: "", disabled: true}],
        price: [{value: "", disabled: true}],
        unit: [{value: "", disabled: true}],
      })    
    }
  

    GoodsOut(form: FormGroup): void {  
      console.log(form.value)

      this.goodsOutService.addGoodsOut(form.value).subscribe((res) => {
        console.log("Response", res)
        this.myForm.reset();
      
        if (res.status === 200) {
          this.toastr.success(res.body.message)
          alert(res.body.message);
      }
        
      },
      (error) => {
        console.log(error, " es eroria")
        this.myForm.reset();

        this.toastr.error(error.error);

        alert(error.error);
      });}


      onPaste(event: ClipboardEvent) {
        let pastedText = event.clipboardData?.getData('text');
        if (pastedText) {
          this.goodsinService.getBarcode(pastedText)
            .subscribe(
              (data) => {
                if (data) {
                  this.myForm.get('name').setValue(data.name);
                  this.myForm.get('price').setValue(data.price);
                  this.myForm.get('unit').setValue(data.unit);
              
                }
              },
            );
        }
      }

}
