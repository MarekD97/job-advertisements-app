import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import * as moment from 'moment';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  data: Array<any>;
  users: Array<any>;
  selectedUser: any;
  selectedMessages: any;
  constructor(public fs: FirebaseService, public router: Router) {
    this.users = new Array();
    fs.auth.onAuthStateChanged(user => {
      if (user) {
        fs.getMessages().subscribe(messages => {
          this.data = messages;
          this.data.map((item: any) => {
            fs.getAdvertisement(item.advertisementId).subscribe(advertisement => {
              item.advertisement = advertisement;
            });
            fs.getAuthorData(item.senderId).subscribe(sender => {
              item.sender = sender;
              item.sender.id = item.senderId;
              if (!this.users.find(o => o.id === item.senderId)) {
                this.users.push(item.sender);
              }
              this.selectedUser = this.users[0];
              this.selectedMessages = this.data.filter(message => {
                return message.senderId === this.selectedUser.id;
              });
            });
          });
        });
      } else {
        router.navigate(['/account/login']);
      }
    });
  }

  ngOnInit(): void {
  }

  formatDate(createdAt: Date): string {
    moment.locale('pl');
    const date = moment(createdAt);
    return date.format('DD MMMM yyyy, HH:mm');
  }

  selectUser(index: number): void {
    console.log(index);
    this.selectedUser = this.users[index];
    this.selectedMessages = this.data.filter(item => {
      return item.senderId === this.selectedUser.id;
    });
  }

}
