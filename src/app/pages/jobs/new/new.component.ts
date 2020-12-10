import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-new-job',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewJobComponent implements OnInit {
  newJobForm: FormGroup;
  public categories: string[] = [
    'Sprzątanie',
    'Opieka nad zwierzętami',
    'Opieka nad dziećmi',
    'Opieka nad osobami niepełnosprawnymi',
    'Ogrodnictwo',
    'Udzielanie korepetycji',
    'Transport',
    'Praca sezonowa',
    'Inne'
  ];
  photoURL: string;
  constructor(public fs: FirebaseService, public fb: FormBuilder, public router: Router, private storage: AngularFireStorage) {
    fs.auth.onAuthStateChanged((user) => {
      if (!user) {
        this.router.navigate(['/account/login']);
      }
    });
    this.newJobForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      expectedPrice: new FormControl('', [Validators.required]),
      isAgeOfMajorityRequired: new FormControl('', [Validators.required]),
      detail: new FormControl('', [Validators.required]),
    });
    this.photoURL = 'https://firebasestorage.googleapis.com/v0/b/praca-dla-mlodych.appspot.com/o/assets%2Flogo.png?alt=media&token=11411bbd-6d70-4b96-8c2c-67fb3ec24b24';
  }

  ngOnInit(): void {
  }

  createAdvertisement(fg: FormGroup, isPublished: boolean): void {
    if(fg.valid) {
      const newAdvertisement = {
        title: fg.value.title,
        category: fg.value.category,
        expectedPrice: fg.value.expectedPrice,
        isAgeOfMajorityRequired: fg.value.isAgeOfMajorityRequired,
        detail: fg.value.detail,
        createdAt: new Date(),
        updatedAt: new Date(),
        userAccountId: this.fs.currentUser.uid,
        isActive: isPublished,
        image: {
          url: this.photoURL
        }
      };
      this.fs.createNewAdvertisement(newAdvertisement);
      this.router.navigate(['/account/settings']);
    } else {
      alert('Nie podano wszystkich danych!');
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    const filePath = `jobsPicture/${Date.now()}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(url => {
          if (url) {
            this.photoURL = url;
          }
        });
      })
    ).subscribe(() => {
      fileRef.getDownloadURL().subscribe(url => {
        if (url) {
          this.photoURL = url;
          this.newJobForm.patchValue({
            image: {
              url: this.photoURL
            }
          });
          console.log(url);
        }
      });
    });
  }

}
