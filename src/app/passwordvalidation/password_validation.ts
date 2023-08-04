import { AbstractControl } from "@angular/forms";

export function passwordComplexityValidator(control: AbstractControl): { [key: string]: any } | null {
    const password = control.value;
    if (!password) {
      return null;
    }
  
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumeric = /[0-9]/.test(password);
    const hasSymbol = /\W/.test(password);
    
    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSymbol;
    
    if (!passwordValid) {
      return { passwordComplexity: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one symbol.' };
    }
    
    return null;
}
