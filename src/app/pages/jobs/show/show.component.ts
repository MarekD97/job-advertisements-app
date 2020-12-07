import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import * as moment from 'moment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowJobComponent implements OnInit {
  public jobId: string;
  public jobData: any;
  public isPhoneNumberVisible = false;
  public isMessageFormVisible = false;
  constructor(public fs: FirebaseService, public router: Router, private route: ActivatedRoute, private location: Location) {
    this.route.params.subscribe((params) => {
      this.jobId = params.id;
    });
    this.fs.getAdvertisement(this.jobId).subscribe(data => {
      this.jobData = data;
      this.fs.getAuthorData(this.jobData.userAccountId).subscribe(author => {
        this.jobData.author = author;
      });
    });

  }

  ngOnInit(): void {
  }

  formatDate(): string {
    moment.locale('pl');
    const date = moment(this.jobData.updatedAt.toDate());
    return date.format('HH:mm, DD MMMM yyyy');
  }

  showPhoneNumber(): void {
    this.isPhoneNumberVisible = true;
  }

  showMessageForm(): void {
    if(this.fs.currentUser === undefined) {
      this.router.navigate(['account/login']);
    } else {
      this.isMessageFormVisible = true;
    }
  }
  hideMessageForm(): void {
    this.isMessageFormVisible = false;
  }



}
