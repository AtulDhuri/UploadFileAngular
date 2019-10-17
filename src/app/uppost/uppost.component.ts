import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularfirebaseService } from '../shared/angularfirebase.service';
import { AuthService } from '../shared/auth.service';
import { tap } from 'rxjs/operators';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-uppost',
  templateUrl: './uppost.component.html',
  styleUrls: ['./uppost.component.css']
})

export class UppostComponent implements OnInit {
  today: number = Date.now();
  posts : any;
  postForm : FormGroup;
  commentForm : FormGroup;
  currentUser:any;
  userpost: any;
  allpost :any;
  postId : string;
  like : boolean;
  btnText : string = "like";
  downloadURL: any;
  uploadProgress: any;
  uploadState: any;
 // fans : any[];
  imgURL : string;
  postDetails : object;
  selectedImage: any;

  createPostForm(){
  this.postForm  = new FormGroup({
    post: new FormControl('', Validators.required)
  });
}

createCommentForm(){
  this.commentForm  = new FormGroup({
    post: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.required)
  });
}

constructor(private todoService : AngularfirebaseService, private authService : AuthService) {
     this.currentUser = this.authService.oauth;
     console.log("check uid",this.currentUser.uid); 
}


ngOnInit() {
    this.createPostForm();
    this.createCommentForm();
    this.listuserPost();
    this.listAllPost();
}

  listuserPost(){
    this.todoService.listUserPost(this.currentUser.uid)
    .pipe(tap(uposts => console.log(uposts, "Single user post value")))
    .subscribe(uposts => {
            this.userpost = uposts.reverse();
    });
  }

  listAllPost(){
    this.todoService.listFullPost()
    .pipe(tap(posts => console.log(posts,"All post value")))
    .subscribe(posts =>{ 
          this.allpost = posts.reverse();
        });
  }

  onPostSubmit(post){  
      const formattedPost = {
        post : post.post,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      }

    this.savePost(formattedPost).then(success => {
      console.log("success", success);
      this.postForm.reset();
      this.selectedImage= '';
    });
  }


  onPostSelect(postid){
      this.postId = postid.key;
      this.commentForm.setValue({
      post: postid.post,
      comment: ''
    });
  }

  selectImage(event) {
    this.selectedImage = event.target.files[0];
  }

  savePost(post){
    const postID = Math.random().toString(36).substring(7);
    if(this.selectedImage){
          return this.todoService.imageUpload(this.selectedImage).then(
            downloadURL => {
                post.imgURL = downloadURL;
              return this.todoService.addpost(post,this.currentUser.uid,postID)
            }
          )
    }
     else
     {
      return this.todoService.addpost(post,this.currentUser.uid,postID);
    }
  }

  likePost(postid){  
   this.postId = postid.key;
   this.currentUser.uid;
   this.like = true;   
    // To like post  
   this.todoService.likePost(this.postId,this.currentUser.uid).set(this.like).then(success => { 
    console.log("success", success); 
  });
  }

  unLikePost(postid){
    this.postId = postid.key;
    this.currentUser.uid;
    this.like = true;
     // To unlike post
    this.todoService.likePost(this.postId,this.currentUser.uid).remove().then(success => { 
    console.log("success", success);
    });
  }
}

