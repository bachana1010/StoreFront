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
            // if password is filled
            user = { ...user, Password: formValue.password };
        } else if (this.generatedPassword && this.generatedPassword !== '') {
            // if generated password is available
            user = { ...user, Password: this.generatedPassword };
        }
    
        this.userService.updateUser(id, user).subscribe((res) => {
            this.myForm.reset();
            this.router.navigateByUrl('/user'); 
            alert(`${user.Username} ${res.message}`);

        },
        (error) => {
          // Handle the error 
          console.log(error)});
      } else {
        console.log("ID is null");
      }
    }
    
  
          
          }

