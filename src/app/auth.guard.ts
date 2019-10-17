import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './shared/auth.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  currentUser:any;
  constructor(private route : Router, private authService : AuthService){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):Observable<boolean> {
      
        return this.authService.isLoggedIn()
        .pipe(
          map(auth => !!auth),
          tap(auth => { 
            if(!auth){
              this.route.navigate(['/login']);
            }
          })
        )}
}
