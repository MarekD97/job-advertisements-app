import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';
import * as moment from 'moment';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  dataList: Array<any>;
  userList: Array<any>;
  constructor(public fs: FirebaseService, public router: Router) {
    this.fs.fs.collection('users').valueChanges({idField: 'id'}).subscribe(data => {
      this.userList = data;
    });
    this.fs.getAdvertisements().subscribe((data) => {
      this.dataList = data;
      this.dataList.map(item => {
        item.author = this.userList.find(element => element.id === item.userAccountId);
      });
    });
  }

  ngOnInit(): void {
  }

  formatDate(dateToFormat): string {
    moment.locale('pl');
    const date = moment(dateToFormat.toDate());
    return date.format('HH:mm, DD MMMM yyyy');
  }

}
