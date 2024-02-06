import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AuthorItem, JobItem } from 'src/app/types/job.type';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-job-view',
  templateUrl: './job-view.component.html',
  styleUrls: ['./job-view.component.scss']
})
export class JobViewComponent implements OnInit {

  public loading: boolean = true;
  public jobId: string;
  public job: JobItem;
  public isAuthor: boolean = false;
  public isMessageFormVisible = false;
  public isPhoneNumberVisible = false;

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.jobId = params.id;
      this.getData();
    });
  }

  showMessageForm(): void {
    this.isMessageFormVisible = true;
  }

  hideMessageForm(): void {
    this.isMessageFormVisible = false;
  }

  showPhoneNumber(): void {
    this.isPhoneNumberVisible = true;
  }

  private getData() {
    if(this.jobId) {
      this.firebaseService.getAdvertisement(this.jobId).pipe(
        switchMap(
          (job: JobItem) => this.firebaseService.getAuthorData(job.userAccountId).pipe(
            map((author: AuthorItem) => ({...job, author}))
          )
        )
      )
      .subscribe({
        next: (res) => {
          this.job = res;
          const curentUserId = this.firebaseService.currentUser.uid;
          if(curentUserId) {
            this.isAuthor = res.userAccountId === curentUserId;
          }
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
        }
      });
    }
  }

}
