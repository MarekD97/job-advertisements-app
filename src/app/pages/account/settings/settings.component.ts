import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import * as moment from 'moment';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public data: any;
  constructor(public fs: FirebaseService) {
    this.fs.auth.onAuthStateChanged(user => {
      this.fs.getUserAdvertisements().subscribe(data => {
        this.data = data;
      });
    })
  }

  ngOnInit(): void {

  }

  formatDate(dateToFormat: any): string {
    moment.locale('pl');
    const date = moment(dateToFormat.toDate());
    return date.format('HH:mm, DD MMMM yyyy');
  }

}
