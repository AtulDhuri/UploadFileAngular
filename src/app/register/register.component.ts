import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

const touchAll = (formGroup: FormGroup | FormArray, funcs = ['markAsDirty', 'markAsTouched'], opts = { onlySelf: false }): boolean => {
  for (const c in formGroup.controls) {
  if (formGroup.controls[c] instanceof FormGroup || formGroup.controls[c] instanceof FormArray) {
  touchAll(formGroup.controls[c], funcs, opts);
  } else {
  funcs.forEach(func => formGroup.controls[c][func](opts));
  formGroup.controls[c].updateValueAndValidity();
  }
  }
  return true;
  }


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  registerForm : FormGroup;
  submitted: boolean = false;

  createRegisterForm(){
    this.registerForm = new FormGroup({
      userEmail : new FormControl('',[Validators.required, Validators.email]),
      mobileNumber : new FormControl('',Validators.required),
      password : new FormControl('',[Validators.required, Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}")]),
      confirmPassword : new FormControl('', Validators.required),
      area : new FormGroup({
        street : new FormControl('',Validators.required),
        landmark : new FormControl('',Validators.required),
        pincode : new FormControl('',Validators.required)
      })
    }, this.checkPassword)
  }

  constructor(private authService : AuthService) { }

  register(user : any){
    this.submitted = true;
    console.log(this.registerForm.controls, "userconsole");
    if(!this.registerForm.valid){
      return touchAll(this.registerForm);
  }
    this.authService.registerUser(user.userEmail, user.password)
    .then(success => {
      console.log(this.authService.saveUserDetails(success.user.uid, user));
      return this.authService.saveUserDetails(success.user.uid, user);
    })
    .then(success => {
      console.log(success, "saveUserDetails");
    }).catch(error => {
     console.log(error) })
  }

  checkPassword(group: FormGroup){
    var pass = group.controls.password.value;
    console.log(pass, "pass");
    var confirmpass = group.controls.confirmPassword.value;
    console.log(confirmpass, "cpass");
    return ((pass === confirmpass) ? null : {notSame : true});
  }

  ngOnInit() {
    this.createRegisterForm();
  }

}
