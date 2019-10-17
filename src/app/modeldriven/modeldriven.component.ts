import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularfirebaseService } from '../shared/angularfirebase.service';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-modeldriven',
  templateUrl: './modeldriven.component.html',
  styleUrls: ['./modeldriven.component.css']
})
export class ModeldrivenComponent implements OnInit {
  modelForm : FormGroup
  createForm(){
  this.modelForm  = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)] ),
    description: new FormControl('', Validators.required),
    IC : new FormControl('', Validators.required)
  });
}
 
  courses:any[];
  $key:string;
  selectedCourseKey : string;
  currentUser:any;
  

  constructor(private todoService : AngularfirebaseService, private authService : AuthService) {
    
    this.currentUser = this.authService.oauth;
       console.log("check uid",this.currentUser.uid); 
        
   }
  

  ngOnInit() {

    this.createForm();
    this.listCourses();    
  }

  listCourses(){

    this.todoService.listCourses(this.currentUser.uid).subscribe(
      courses => this.courses = courses,
      
    );    
  }

  onSubmit(value :any, valid: boolean){
    if(!valid){
      return;
    }
   
    if (this.selectedCourseKey){
      console.log(this.selectedCourseKey, value);
      this.todoService.updateCourse(this.selectedCourseKey, value,this.currentUser.uid).then(success => { 
        console.log("success", success);
        this.selectedCourseKey = undefined;
        this.modelForm.reset();
      })      
     }
     else{
        
        this.todoService.saveCourse(value,this.currentUser.uid).then(success => { 
        console.log("success", success);
        this.selectedCourseKey = undefined;
        this.modelForm.reset();
      })     
     }
   
  }

  onSelect(course: any){
    this.selectedCourseKey = course.key;
    this.modelForm.setValue({
      name: course.name,
      description: course.description,
      IC: course.IC
    });
  }


  singleRemove(value: any){
    this.todoService.deleteCourses(value, this.currentUser.uid).then(success => {      
        this.modelForm.reset();
      }).catch(error=> {
          console.log(error);
      });
   }
}
