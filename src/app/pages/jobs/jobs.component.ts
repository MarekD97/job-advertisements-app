import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {
  dataList: Array<Object>;
  userList: Array<Object>;
  constructor(public fs: FirebaseService, public router: Router) {
    this.fs.fs.collection("users").valueChanges({idField: 'id'}).subscribe(data=> {
      this.userList = data;
    })
    this.fs.getAdvertisements().subscribe((data) => {
      this.dataList = data;
      this.dataList.map(item => {
        item['author'] = this.userList.find(element => element['id'] == item['userAccountId']);
      })
    });
  }

  ngOnInit(): void {
  }

}
