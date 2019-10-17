import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private  authService : AuthService, private router: Router) { }

  loginform : FormGroup;

  createLoginForm(){
    this.loginform = new FormGroup(
      {
        username :new FormControl(),
        userpassword  : new FormControl()
      }
    )
  }
  emailLogin(email,pass) {
    this.authService.login(email,pass).then(() => {
      console.log("success");
      this.router.navigateByUrl('/post');
    })
    .catch(error => console.log(error));
 }

  ngOnInit() {
    this.createLoginForm();
  }

}
