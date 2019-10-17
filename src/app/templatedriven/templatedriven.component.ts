import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-templatedriven',
  templateUrl: './templatedriven.component.html',
  styleUrls: ['./templatedriven.component.css']
})
export class TemplatedrivenComponent implements OnInit {

  ngOnInit() {
  }
  isSubmitted = false;
  selectedCourseKey: string;
  @ViewChild('pushForm', { static: true }) form: any;

  courses: any[];
  $key: string;

  constructor(private db: AngularFireDatabase) {
    // db.list('/todo').valueChanges().subscribe(courses => {
    //  this.courses = courses;

    db.list('/todo').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    ).subscribe(courses => this.courses = courses);

  }

  onSubmit(value: any) {
    if (this.selectedCourseKey) {
      this.db.object(`/todo/${this.selectedCourseKey}`).update(value).then(success => {
        console.log("success", success);
        this.selectedCourseKey = undefined;
        this.form.reset();
      })
    }
    else {
      this.db.list('/todo').push(value).then(success => {
        console.log("success", success);
        this.selectedCourseKey = undefined;
        this.form.reset();
      })
    }
  }

  singleRemove(value: any) {
    this.db.list('/todo').remove(value).then(success => {
      console.log("deleted", success);
      this.selectedCourseKey = undefined;
      this.form.reset();
    })
  }

  onSelect(course: any) {
    this.selectedCourseKey = course.key;
    this.form.setValue({
      uname: course.name,
      description: course.description,
      IC: course.IC
    });
  }
}
