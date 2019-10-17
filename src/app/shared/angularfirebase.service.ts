import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';

@Injectable({
  providedIn: 'root'
})
export class AngularfirebaseService {
  courses:any[];
  $key:string;
  selectedCourseKey : string;
  post: any;
  uploadProgress: Observable<number>;

  constructor(private db : AngularFireDatabase, private afStorage: AngularFireStorage)
   { }

    ref: AngularFireStorageReference;
    task: AngularFireUploadTask;

   listCourses(user){
    // console.log("listcourses", user);
   return this.db.list(`/todo/${user}`).snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    )
   }

   deleteCourses(courseKey: string, user){
     return this.db.list(`/todo/${user}`).remove(courseKey);
   }

   saveCourse(course: any,user?: string){
    // console.log("saveCourse", user);
    // console.log("saveCourse", course);
     return this.db.list(`/todo/${user}`).push(course);
   }

   updateCourse(courseKey: string, course: any, user){
    return this.db.object(`/todo/${user}/${courseKey}`).update(course);
   }

  singleRemove(value: any){
    this.db.list('/todo').remove(value);
    // console.log(value);
   }

  addpost(post: any, userID: string, postID: string){
   // console.log(post, "addpost");
    const fanOutObj = {
      [`/posts/${userID}/${postID}`] : post,
      [`/posts/all/${postID}`] : post,
    };
    return this.db.object('/').update(fanOutObj);
  }

  listUserPost(user){    
  return this.db.list(`/posts/${user}`).snapshotChanges().pipe(
     map(changes => 
       changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
     )
   )
  }

  listFullPost(){    
  return this.db.list(`/posts/all`,ref => ref.orderByChild('timestamp').limitToLast(15)).snapshotChanges().pipe(
     map(changes => 
       changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
     )
   )
  }

  addComment(comment: any, postid){
    return this.db.list(`/comments/${postid}`).push(comment);
  }

  getSinglePost(id: string): Observable<any> {
    return this.db.object(`/posts/all/${id}`).snapshotChanges().pipe(
      map(changes => ({ key: changes.payload.key, ...changes.payload.val() }))
      )
    } 
    
  getCommentByPostId(postId: string){
    return this.db.list(`/comments/${postId}`).snapshotChanges().pipe(
      map(changes => 
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    )    
  }

  likePost(postId, uid){    
    return this.db.object(`/posts/all/${postId}/fans/${uid}`);    
  }

  unlikePost(postId, uid){
    return this.db.list(`/posts/all/${postId}/fans/${uid}`);
  } 

  checkFans(postId){
    return this.db.list(`/posts/all/${postId}/fans`);
  }

  imageUpload(image){
    const id = Math.random().toString(36).substring(2);
   // console.log(id);
    this.ref = this.afStorage.ref(id);
   // console.log(this.ref);    
    this.task = this.ref.put(image);
    return this.task.then(
     success => { 
      return this.ref.getDownloadURL().toPromise();
     // this.uploadProgress = this.task.percentageChanges();
     }
    )
  }
}