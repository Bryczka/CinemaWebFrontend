import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { FormControl, Validators, FormGroup, FormGroupDirective, NgForm, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({});
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  userNameFormControl = new FormControl('', [Validators.required, Validators.minLength(4)]);
  passwordFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  confirmationFormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
  nameFormControl = new FormControl('', [Validators.required]);
  surnameFormControl = new FormControl('', [Validators.required]);
  phoneFormControl = new FormControl('', [Validators.maxLength(9), Validators.minLength(9), Validators.required]);

  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  register() {
    this.getRegisterData();
    console.log(this.emailFormControl.value);
    console.log(this.registerForm.value);
    this.authService.register(this.registerForm.value).subscribe(() => {
      console.log('Registered');
    }, error => {
      console.log(error);
    });
  }

  cancel() {
    console.log('Canceled register');
  }

  getRegisterData() {
    this.registerForm.addControl('email', this.emailFormControl);
    this.registerForm.addControl('login', this.userNameFormControl);
    this.registerForm.addControl('password', this.passwordFormControl);
    this.registerForm.addControl('name', this.nameFormControl);
    this.registerForm.addControl('surname', this.surnameFormControl);
    this.registerForm.addControl('phoneNumber', this.phoneFormControl);
  }

  checkValidation() {
    if (this.emailFormControl.valid &&
        this.userNameFormControl.valid &&
        this.passwordFormControl.valid &&
        this.confirmationFormControl.valid &&
        this.nameFormControl.valid &&
        this.surnameFormControl.valid &&
        this.phoneFormControl.valid &&
        this.passwordFormControl.value === this.confirmationFormControl.value) { return true; }
    return false;
  }
}
