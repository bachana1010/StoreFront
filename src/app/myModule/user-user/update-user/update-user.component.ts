import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  generatedPassword: string = ''; // Initialize your variable here to hold the generated password

  updateuser: updateUsers[] =  []
  branches: GetBranch[] = []
  branchesName: any[] = [];
  public DataForUpdate: any = {};

constructor(
            private fb: FormBuilder, 
            private route: ActivatedRoute,
            private userService: UserService,
            private branchService: BranchService
            ) { }


      ngOnInit(): void {
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
          this.getUserByid(+id); // The "+" symbol is used to convert the string to a number
          console.log(id); // This should log the user ID to the console.
        }
    }
    
    getUserByid(id: number) {
        this.userService.getUserById(id).subscribe((response: UserApiResponse) => {
          this.UserData = response;  // your response is directly the array of users
          this.DataForUpdate = response;

          console.log(this.UserData);
          
        });
          }

    generatePassword() {
      const length = 8; // Define the length of the password
      const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Define the characters to choose from
      let retVal = "";
      for (let i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
      }
    
      this.generatedPassword = retVal; // store the generated password
      this.myForm.controls['password'].setValue(retVal);  // display the password in the field
      this.myForm.controls['password'].disable();  // disable the field
    }
              

    getBranches():void{
      this.branchService.getBranches().subscribe((response: BranchApiResponse) => {
        console.log('esaa axali responsi', response);
    
        this.branches = response;  
        console.log(this.branches);

        if (this.DataForUpdate.role === 'operator' || this.DataForUpdate.role === 'manager') {
          this.myForm.get('role').disable();
        }
        console.log(this.DataForUpdate);
        console.log(this.myForm);
        console.log(this.myForm.get('role'));

        
      });
    }


    updateUser(form: FormGroup) {
      const id = this.route.snapshot.paramMap.get('id');
      
      if (id !== null) {
        // Prepare user object to match updateUsers interface
        const formValueWithPassword = { ...form.getRawValue(), Password: this.generatedPassword };
    
        let user: updateUsers = {
          Id: formValueWithPassword.id, 
          FirstName: formValueWithPassword.firstName,
          LastName: formValueWithPassword.lastName,
          Email: formValueWithPassword.email,
          Username: formValueWithPassword.userName
        };
    
        // Conditionally add password 
        if (formValueWithPassword.Password !== '') {
          user = { ...user, Password: formValueWithPassword.Password }
        }
        
        this.userService.updateUser(id, user).subscribe((res) => {
          console.log(formValueWithPassword.id, "es aidia?")
          this.myForm.reset();
        });
      } else {
        console.log("ID is null");
      }
    }
    
    
    
  
          
          }

