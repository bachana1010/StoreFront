import { Component, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { passwordComplexityValidator } from 'src/app/passwordvalidation/password_validation'; 

export function passwordsMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.get('Password');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword || !password.value || !confirmPassword.value) {
    return null;
  }

  if (password.value !== confirmPassword.value) {
    return { 'passwordsMismatch': true };
  }

  return null;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  public registrationForm: FormGroup | any;
  public SendRegistrationForm: any = ""
  public passwordFocused = false; 
  public passwordVisible = false; 

  constructor( 
    private renderer: Renderer2,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      OrganizationName: ["", Validators.required],
      Address: ["", Validators.required],
      Email: ["", [Validators.required, Validators.email]],
      FirstName: ["", Validators.required],
      LastName: ["", Validators.required],
      UserName: ["", Validators.required],
      Password: ["", [Validators.required, Validators.minLength(6), passwordComplexityValidator]], 
      confirmPassword: ["", Validators.required]
    }, { validators: passwordsMatchValidator });

    this.renderer.setStyle(
      document.body, 
      'background', 
      '#f0f0f0d5'
    );
  }

  ngOnDestroy() {
    this.renderer.removeStyle(document.body, 'background');
  }

  signUp(form: FormGroup) {
    console.log(form.value);
    this.SendRegistrationForm = form.value;
  
    this.authService.registerUser(this.SendRegistrationForm).subscribe(
      (res) => {
        alert("Registered successfully");
        this.router.navigateByUrl("/signin");
        console.log(res);
        form.reset();
      },
      (err) => {
        console.log(err);
        if (err.status === 400) {
          if (err.error.message === "Email already exists.") {
            alert("Registration failed: Email already registered");
          } else if (err.error.message === "Username already taken") {
            alert("Registration failed: Username already taken.");
          }
        } else {
          alert("Registration failed: " + err.statusText + ". Try again");
        }
      }
    );
  }

  hasLength(password: string): boolean {
    return password.length >= 6;
  }

  hasUpper(password: string): boolean {
    return /[A-Z]/.test(password);
  }

  hasLower(password: string): boolean {
    return /[a-z]/.test(password);
  }

  hasNumeric(password: string): boolean {
    return /[0-9]/.test(password);
  }

  hasSymbol(password: string): boolean {
    return /\W/.test(password);
  }
}
