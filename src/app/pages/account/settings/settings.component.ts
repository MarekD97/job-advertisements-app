import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import * as moment from 'moment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public jobData: any;
  constructor(public fs: FirebaseService) {
    if (this.fs.currentUser) {
      this.fs.getUserAdvertisements().subscribe(data => {
        this.jobData = data;
      });
    }
  }

  ngOnInit(): void {
  }

  formatDate(dateToFormat): string {
    moment.locale('pl');
    const date = moment(dateToFormat.toDate());
    return date.format('HH:mm, DD MMMM yyyy');
  }

}
