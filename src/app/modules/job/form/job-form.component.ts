import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { FirebaseService } from 'src/app/services/firebase.service';
import { JobItem, SimpleNameItem } from 'src/app/types/job.type';

const DEFAULT_PHOTO_URL = 'https://firebasestorage.googleapis.com/v0/b/praca-dla-mlodych.appspot.com/o/assets%2Flogo.png?alt=media&token=11411bbd-6d70-4b96-8c2c-67fb3ec24b24';

@Component({
  selector: 'app-job-form',
  templateUrl: './job-form.component.html',
  styleUrls: ['./job-form.component.scss']
})
export class JobFormComponent implements OnInit {

  public loading: boolean = false;
  public isEdit: boolean = false;

  public form: FormGroup;
  public job: JobItem;
  public jobId: string;
  public photoUrl: string = DEFAULT_PHOTO_URL;

  public categoryList: SimpleNameItem[] = [
    { id: 0, name: 'Sprzątanie' },
    { id: 1, name: 'Opieka nad zwierzętami' },
    { id: 2, name: 'Opieka nad dziećmi' },
    { id: 3, name: 'Opieka nad niepełnosprawnymi' },
    { id: 4, name: 'Ogrodnictwo' },
    { id: 5, name: 'Udzielanie korepetycji' },
    { id: 6, name: 'Transport' },
    { id: 7, name: 'Praca sezonowa' },
    { id: 8, name: 'Inne' }
  ]

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.jobId = params.id;

      if (this.jobId) {
        this.isEdit = true;
        this.getData();
      } else {
        this.initForm();
      }
    });
  }

  private getData(): void {
    this.loading = true;
    this.firebaseService.getAdvertisement(this.jobId).subscribe({
      next: (res) => {
        this.job = res;
        this.initForm();
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      }
    })
  }

  onSubmit(publish: boolean): void {
    console.log('test')
    if (this.form.valid) {
      let data: JobItem = {
        title: this.form.controls['title'].value,
        category: this.form.controls['category'].value,
        expectedPrice: this.form.controls['expectedPrice'].value,
        isAgeOfMajorityRequired: this.form.controls['isAgeOfMajorityRequired'].value,
        detail: this.form.controls['detail'].value,
        updatedAt: new Date(),
        userAccountId: this.firebaseService.currentUser.uid,
        isActive: publish,
        image: {
          url: this.photoUrl
        }
      }
      if (!this.isEdit) {
        data.createdAt = new Date();
      }

      if (this.isEdit) {
        this.firebaseService.updateAdvertisement(this.jobId, data);
       } else {
        this.firebaseService.createAdvertisement(data);
       }
       this.router.navigate(['/account/settings']);
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
            this.photoUrl = url;
          }
        });
      })
    ).subscribe(() => {
      fileRef.getDownloadURL().subscribe(url => {
        if (url) {
          this.photoUrl = url;
          this.form.patchValue({
            image: {
              url: this.photoUrl
            }
          });
        }
      });
    });
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      title: new FormControl(this.job?.title || null, [Validators.required]),
      category: new FormControl(this.job?.category || null, [Validators.required]),
      expectedPrice: new FormControl(this.job?.expectedPrice || null, [Validators.required]),
      isAgeOfMajorityRequired: new FormControl(this.job?.isAgeOfMajorityRequired || false, [Validators.required]),
      detail: new FormControl(this.job?.detail || null, [Validators.required]),
    });
    console.log('Init')
  }

}
