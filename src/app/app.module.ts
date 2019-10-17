import { environment } from './../environments/environment'
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'


import { AngularFireModule } from 'angularfire2'
import { AngularFireDatabaseModule } from 'angularfire2/database'
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplatedrivenComponent } from './templatedriven/templatedriven.component';
import { ModeldrivenComponent } from './modeldriven/modeldriven.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AngularfirebaseService } from './shared/angularfirebase.service'
import { AuthGuard } from './auth.guard';
import { TimeAgoPipe } from 'time-ago-pipe';

import { UppostComponent } from './uppost/uppost.component';
import { CommentComponent } from './comment/comment.component';
import { UploadfileComponent } from './uploadfile/uploadfile.component';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { UploadFileServiceComponent } from './upload-file-service/upload-file-service.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';



@NgModule({
  declarations: [
    AppComponent,
    TemplatedrivenComponent,
    ModeldrivenComponent,
    LoginComponent,
    RegisterComponent,
    UppostComponent,
    CommentComponent,
    TimeAgoPipe,
    UploadfileComponent,
    UploadFileServiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  providers: [AngularfirebaseService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
