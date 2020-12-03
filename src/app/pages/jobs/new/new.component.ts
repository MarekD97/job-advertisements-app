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
  constructor(public fs: FirebaseService, public fb: FormBuilder, public router: Router) {
    fs.auth.onAuthStateChanged((user)=>{
      if(!user) {
        this.router.navigate(['/account/login']);
      }
    })
    this.newJobForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      expectedPrice: new FormControl('', [Validators.required]),
      isAgeOfMajorityRequired: new FormControl('', [Validators.required]),
      detail: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  createAdvertisement(fg: FormGroup, isPublished: boolean) {
    let newAdvertisement = {
      title: fg.value.title,
      category: fg.value.category,
      expectedPrice: fg.value.expectedPrice,
      isAgeOfMajorityRequired: fg.value.isAgeOfMajorityRequired,
      detail: fg.value.detail,
      createdAt: new Date(),
      updatedAt: new Date(),
      userAccountId: this.fs.currentUser.uid,
      isActive: isPublished,
    }
    this.fs.createNewAdvertisement(newAdvertisement);
  }

}
