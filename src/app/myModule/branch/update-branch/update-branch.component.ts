import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetBranch,BranchApiResponse,AddBranch } from '../../../interfaces/branch';
import { BranchService } from '../../../services/branch.service';

@Component({
  selector: 'app-update-branch',
  templateUrl: './update-branch.component.html',
  styleUrls: ['./update-branch.component.scss']
})
export class UpdateBranchComponent implements OnInit {
  BranchData: GetBranch[] = [];
  myForm: FormGroup | any;

  updateuser: AddBranch[] =  []
  branches: GetBranch[] = []
  branchesName: any[] = [];
  
  public DataForUpdate: any = {};
  
constructor(
            private fb: FormBuilder, 
            private route: ActivatedRoute,
            private branchService: BranchService,
            private router: Router

            ) { }


      ngOnInit(): void {
        this.myForm = this.fb.group({
          branchName: ["", Validators.required],
    
        })    
    
        const id = this.route.snapshot.paramMap.get('id');
    
        if (id) {
          this.getBranch(+id); 
          console.log(id); 
        }
    }

    getBranch(id: number) {
      this.branchService.getBranchById(id).subscribe((response: BranchApiResponse) => {
        this.BranchData = response;  
        this.DataForUpdate = response
      });
        }

        updateBranch(form: FormGroup) {
          const id = this.route.snapshot.paramMap.get('id');
  
          if (id !== null) {
  
            this.branchService.updateBranch(id, form.value).subscribe((res) => {
              this.myForm.reset();
              this.router.navigateByUrl('/branch') 
              alert(`${res.message}`);
  
  
            });
          } else {
            console.log("ID is null");
          }
        }
  }
          

      
