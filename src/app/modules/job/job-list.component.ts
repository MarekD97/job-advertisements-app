import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { JobItem } from 'src/app/types/job.type';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit, OnDestroy {

  public jobs: JobItem[] = [];
  public loading: boolean = true;
  private subscription: Subscription;

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.subscription = this.firebaseService.getAdvertisements().subscribe({
      next: (res) => {
        this.jobs = res;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onFilterChange(event: any): void {

  }
}
