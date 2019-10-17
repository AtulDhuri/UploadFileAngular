import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TemplatedrivenComponent } from './templatedriven/templatedriven.component';
import { ModeldrivenComponent } from './modeldriven/modeldriven.component';
import { AuthGuard } from './auth.guard';
import { UppostComponent } from './uppost/uppost.component';
import { CommentComponent } from './comment/comment.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent  },
  { path: 'register', component: RegisterComponent },
  { path: 'templatedriven', component: TemplatedrivenComponent },
  { path: 'modeldriven', canActivate : [AuthGuard],component: ModeldrivenComponent },
  { path: 'post', canActivate : [AuthGuard], component: UppostComponent },
  { path: 'comment/:postid', canActivate : [AuthGuard], component: CommentComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { 
  
}
