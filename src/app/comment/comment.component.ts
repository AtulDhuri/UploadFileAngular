import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../shared/auth.service';
import { AngularfirebaseService } from '../shared/angularfirebase.service';
import { tap } from 'rxjs/operators';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import * as firebase from 'firebase';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {  
currentUser : any;
postdetail : any;
createdby : any;
startedAt : any;
comments : any[];
postId: string;

constructor
(
    private aroute: ActivatedRoute,    
    private location: Location,
    private todoService : AngularfirebaseService,
     private authService : AuthService
)  
  {
    this.currentUser = this.authService.oauth;    
  }

  commentForm : FormGroup
  createCommentForm(){
  this.commentForm  = new FormGroup({
    comment: new FormControl('', Validators.required)    
  });
}


  ngOnInit(): void {
   this.postId = this.aroute.snapshot.params['postid'];
   this.getPostDetails(this.postId);
   this.createCommentForm();
   this.getPostComments(this.postId);
  }
  

  getPostDetails(postId){
    this.todoService.getSinglePost(postId).pipe(
      tap(post => console.log(post,"getid")) 
    )
    //.toPromise()
    //.then
    .subscribe(
      post => this.postdetail = post
    );       
  }

  getPostComments(postId){
    this.todoService.getCommentByPostId(postId).subscribe(
      comments => this.comments = comments
    )
  }



  get timestamp() {
    return firebase.firestore.Timestamp.now();
  }

  onCommentSubmit(commentForm){    
    const post = {
      comment: commentForm.comment,
      commentby: this.currentUser.uid,
      timestamp: firebase.database.ServerValue.TIMESTAMP
    }
    
   this.todoService.addComment(post,this.postId).then(success => {     
    console.log("success", success);
    this.commentForm.reset();
    })     
  }
}
