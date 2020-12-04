import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowJobComponent implements OnInit {
  private routeSub: Subscription;
  public jobId: string;
  public jobData: any = {
    image: ''
  };
  public jobAuthor: any = {
    firstname: '',
    lastname: '',
    phoneNumber: '',
    image: {
      url: ''
    }
  };
  constructor(public fs: FirebaseService, public router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.jobId = params.id;
    });
    this.fs.getAdvertisement(this.jobId).subscribe(data => {
      this.jobData = data;
      this.fs.getAuthorData(this.jobData.userAccountId).subscribe(author => {
        this.jobAuthor = author;
      });
    });

  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }



}
