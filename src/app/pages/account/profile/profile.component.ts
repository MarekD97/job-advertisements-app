import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AngularFireStorage} from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  fsDataSub: Subscription;
  fsData: any;
  profileForm: FormGroup;
  photoURL: string;
  constructor(public fs: FirebaseService, public fb: FormBuilder, public router: Router, private storage: AngularFireStorage) {
    this.fs.auth.onAuthStateChanged((user) => {
      if(user) {
        this.fsDataSub = this.fs.getProfileData().subscribe(data => {
          this.fsData = data;
          console.log(this.fsData);
        })
      } else {
        router.navigate(['/']);
      }
    });
    this.loadPicture();
    this.profileForm = this.fb.group({
      firstname: new FormControl(),
      lastname: new FormControl(),
      phoneNumber: new FormControl(),
      streetName: new FormControl(),
      streetNumber: new FormControl(),
      postcode: new FormControl(),
      city: new FormControl(),
      country: new FormControl(),
    });
  }

  ngOnInit(): void {
  }

  updateProfileData(fg: FormGroup) {
    let newProfileData = {
      firstname: fg.value.firstname,
      lastname: fg.value.lastname,
      phoneNumber: fg.value.phoneNumber,
      address: {
        streetName: fg.value.streetName,
        streetNumber: fg.value.streetNumber,
        postcode: fg.value.postcode,
        city: fg.value.city,
        country: fg.value.country
      }
    }
    console.log(newProfileData);
    this.fs.updateProfileData(newProfileData);
    this.fs.auth.user.subscribe(userState => {
      userState.updateProfile({
        displayName: `${newProfileData.firstname} ${newProfileData.lastname}`,
        photoURL: this.photoURL
      })
    })
  }

  onFileSelected(event) {
    const file = event.target.files[0];
    const filePath = `userPicture/${this.fs.currentUser.uid}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(
      finalize(()=> {
        fileRef.getDownloadURL().subscribe(url => {
          if(url) {
            this.photoURL = url;
            console.log(url)
          }
        });
      })
    ).subscribe(() => {
      fileRef.getDownloadURL().subscribe(url => {
        if(url) {
          this.photoURL = url;
          console.log(url)
        }
      });
    })
  }

  loadPicture() {
    const filePath = `userPicture/${this.fs.currentUser.uid}`;
    const fileRef = this.storage.ref(filePath);
    fileRef.getDownloadURL().subscribe(url => {
      if(url) {
        this.photoURL = url.toString();
      }
    })
  }

}
