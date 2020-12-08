import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import * as moment from 'moment';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  messagesList: Array<any>;
  constructor(public fs: FirebaseService) {
    fs.auth.onAuthStateChanged(user => {
      if (!user) {
        console.log('error');
      }
    });
    fs.getMessages().subscribe(messages => {
      this.messagesList = messages;
      this.messagesList.map(item => {
        fs.getAdvertisement(item.advertisementId).subscribe(advertisement => {
          item.advertisement = advertisement;
        });
        fs.getAuthorData(item.senderId).subscribe(sender => {
          item.sender = sender;
        })
      });
    });
  }

  ngOnInit(): void {
  }

  formatDate(createdAt: Date): string {
    moment.locale('pl');
    const date = moment(createdAt);
    return date.format('DD MMMM yyyy, HH:mm');
  }

}
