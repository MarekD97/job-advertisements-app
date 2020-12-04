import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  photoURL: any;
  constructor(public fs: FirebaseService, public fb: FormBuilder, public router: Router, private storage: AngularFireStorage) {
    this.profileForm = this.fb.group({
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      address: new FormGroup({
        streetName: new FormControl('', [Validators.required]),
        streetNumber: new FormControl('', [Validators.required]),
        postcode: new FormControl('', [Validators.required]),
        city: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
      }),
      image: new FormGroup({
        url: new FormControl('', [Validators.required])
      })
    });
    this.fs.auth.onAuthStateChanged((user) => {
      if(user) {
        this.fsDataSub = this.fs.getProfileData().subscribe(data => {
          this.fsData = data;
          this.profileForm.patchValue(data);
        })
      } else {
        router.navigate(['/']);
      }
    });
    this.loadPicture();
  }

  ngOnInit(): void {
  }

  updateProfileData(fg: FormGroup): void {
    this.fs.updateProfileData(fg.value);
    this.fs.auth.user.subscribe(userState => {
      userState.updateProfile({
        displayName: `${fg.value.firstname} ${fg.value.lastname}`,
        photoURL: this.photoURL
      })
    })
  }

  onFileSelected(event): void {
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
          this.profileForm.patchValue({
            image: {
              url: this.photoURL
            }
          });
          console.log(url)
        }
      });
    })
  }

  loadPicture(): void {
    const filePath = `userPicture/${this.fs.currentUser.uid}`;
    const fileRef = this.storage.ref(filePath);
    fileRef.getDownloadURL().subscribe(url => {
      if(url) {
        this.photoURL = url.toString();
      }
    })
  }

}
