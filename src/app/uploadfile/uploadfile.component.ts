import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularfirebaseService } from '../shared/angularfirebase.service';


@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css']
})
export class UploadfileComponent implements OnInit { 
  downloadURL: any;
  uploadProgress: any;
  uploadState: any;

  constructor(private afStorage: AngularFireStorage, private todoService : AngularfirebaseService) { }

  ngOnInit() {
  }

  upload(event) {
    this.todoService.imageUpload(event).then(
      downloadURL =>  {
        this.downloadURL = downloadURL,
        console.log(this.downloadURL);
      }
    )
  }
}
