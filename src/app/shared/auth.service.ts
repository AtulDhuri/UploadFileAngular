import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user :any;
  oauth: any;
  constructor(private afAuth: AngularFireAuth, private db : AngularFireDatabase ) {
  this.checkAuthState();
   }

  registerUser(userEmail,password){
    return this.afAuth.auth.createUserWithEmailAndPassword(userEmail,password);
  }

  login(email,pass){
    return this.afAuth.auth.signInWithEmailAndPassword(email,pass);
  }

  signOut(){
    return this.afAuth.auth.signOut();
  }
  
  saveUserDetails(uid: string, user: string){
    return this.db.object(`users/${uid}`).set(user);
  }
  

  checkAuthState(){
    this.afAuth.authState.subscribe(auth => {
      console.log("login state", auth);
      if (auth) {
        this.db.object(`users/${auth.uid}`).valueChanges().subscribe(user => {
          console.log("users", user);
          this.user = user;
          this.oauth = auth;
        });
      } 
    });
  }

  isLoggedIn(){
    return this.afAuth.authState
      .pipe(
        tap(auth => this.oauth = auth),
        switchMap(auth => {
          return auth
          ? this.db.object(`users/${auth.uid}`).valueChanges().pipe(tap(user => this.user = user)) 
          : of(false)
        })
      );
  }
}

