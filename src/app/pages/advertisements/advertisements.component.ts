import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-advertisements',
  templateUrl: './advertisements.component.html',
  styleUrls: ['./advertisements.component.scss']
})
export class AdvertisementsComponent implements OnInit {
  dataList: Array<Object>;
  constructor(public fs: FirebaseService, public router: Router) {
    this.fs.getAdvertisements().subscribe((data) => {
      this.dataList = data;
      this.dataList.map((item) => {
        this.fs.fs.collection("users").doc(item['userAccountId']).valueChanges().subscribe(data=> {
          item['USER'] = data;
        });
      });
      
      console.log(this.dataList);
    });
  }

  ngOnInit(): void {
  }

}
