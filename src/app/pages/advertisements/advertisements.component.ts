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
      console.log(this.dataList);
    })
  }

  ngOnInit(): void {
  }

}
