import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Users, UserApiResponse, updateUsers} from '../../../interfaces/users';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetBranch,BranchApiResponse } from '../../../interfaces/branch';
import { BranchService } from '../../../services/branch.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  UserData: Users[] = [];
  myForm: FormGroup | any;
  generatedPassword: string = ''; 

  updateuser: updateUsers[] =  []
  branches: GetBranch[] = []
  branchesName: any[] = [];
  public DataForUpdate: any = {};

constructor(
            private fb: FormBuilder, 
            private route: ActivatedRoute,
            private userService: UserService,
            private branchService: BranchService,
            private router: Router

            ) { }


      ngOnInit(): void {
          this.route.data.subscribe(data => {
            this.branches = data['branches'];
          });
        this.myForm = this.fb.group({
          email: ["", [Validators.required, Validators.email]],
          userName: ["", Validators.required],
          password: [{value: '', disabled: false}],
          firstName: ["", Validators.required],
          lastName: ["", Validators.required],
          role: [""],
          branchId: ["", Validators.required],
        })    
    
        
        const id = this.route.snapshot.paramMap.get('id');
    
        if (id) {
          this.getUserByid(+id); 
          console.log(id);
        }
    }
    
    getUserByid(id: number) {
      this.userService.getUserById(id).subscribe((response: UserApiResponse) => {
          this.UserData = response;  
          this.DataForUpdate = response;
          console.log(this.UserData);
  
          if (this.DataForUpdate.role === 'operator' || this.DataForUpdate.role === 'manager') {
              this.myForm.controls['role'].disable();
          } else {
              this.myForm.controls['role'].enable();
          }
      });
  }
  

    generatePassword() {
      const length = 8; 
      const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; 
      let retVal = "";
      for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
      }
    
      this.generatedPassword = retVal; 
      this.myForm.controls['password'].setValue(retVal); 
      this.myForm.controls['password'].disable(); 
    }
              

    // getBranches():void{
    //   this.branchService.getBranches().subscribe((response: BranchApiResponse) => {
    //     console.log('esaa axali responsi', response);
    
    //     this.branches = response;  
    //     console.log(this.branches);

    //     if (this.DataForUpdate.role === 'operator' || this.DataForUpdate.role === 'manager') {
    //       this.myForm.get('role').disable();
    //     }
    //     console.log(this.DataForUpdate);
    //     console.log(this.myForm);
    //     console.log(this.myForm.get('role'));

        
    //   });
    // }


    updateUser(form: FormGroup) {
      const id = this.route.snapshot.paramMap.get('id');
      
      if (id !== null) {
          const formValue = form.getRawValue();
  
          let user: updateUsers = {
              Id: formValue.id, 
              FirstName: formValue.firstName,
              LastName: formValue.lastName,
              Email: formValue.email,
              Username: formValue.userName,
          };
          
          // add password 
          if (formValue.password && formValue.password !== '') {
              // tu cahwera
              user = { ...user, Password: formValue.password };

          } else if (this.generatedPassword && this.generatedPassword !== '') {
              // tu daagenerira
              user = { ...user, Password: this.generatedPassword };
          } else {
              console.error("No password provided.");
              return;
          }
  
          this.userService.updateUser(id, user).subscribe((res) => {
              this.myForm.reset();
              this.router.navigateByUrl('/user'); 
          });
      } else {
          console.log("ID is null");
      }
  }
  
    
  
          
          }

