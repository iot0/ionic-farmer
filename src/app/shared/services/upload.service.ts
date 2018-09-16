import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { FirestoreService } from "./firestore.service";
import {
  AngularFireStorage,
  AngularFireUploadTask
} from "angularfire2/storage";
import { Observable } from "rxjs";
import * as firebase from "firebase";

@Injectable({
  providedIn: "root"
})
export class UploadService {
  constructor(
    private firestoreService: FirestoreService,
    private storage: AngularFireStorage
  ) {}

  upload1(path) {
    let task: AngularFireUploadTask;
    let uniqkey = "farmer" + Math.floor(Math.random() * 1000000);

    task = this.storage.upload("hii.jpg", path);

    // this.imgsrc = task.("test/"+uniqkey);

    task.percentageChanges().subscribe(value => {
      //   this.progressBarValue = value.toFixed(2);
      console.log(value);
    });

    let downloadUrl = task.snapshotChanges();
  }
  upload(path) {
    let uniqkey = "farmer" + Math.floor(Math.random() * 1000000);
    this.storage.ref(uniqkey).putString(path).then((res)=>{
        console.log(res);
    }).then((res)=>{
        console.log(res);
    })
  }
}
