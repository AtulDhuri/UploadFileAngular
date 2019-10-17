import { Component,  OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';
import { of, fromEvent } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  @ViewChild('btn', { static : true }) btn: ElementRef;
  isLogged: boolean;

  constructor(private authService: AuthService, private router : Router ){
  }

 logout(){
   this.authService.signOut().then(() => {
     this.router.navigate(['/login']);
   })
 }

  ngOnInit(){
    this.authService.isLoggedIn().subscribe(auth =>{
      this.isLogged = !!auth;
    });
  }
}

