import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-bar',
  templateUrl: './settings-bar.component.html',
  styleUrls: ['./settings-bar.component.scss']
})
export class SettingsBarComponent implements OnInit {
  activeNumber: number;
  constructor(private router: Router) {
    switch(this.router.url) {
      case '/account/settings': this.activeNumber = 0;
      break;
      case '/jobs/new': this.activeNumber = 1;
      break;
      case '/messages': this.activeNumber = 2;
      break;
      case '/account/profile': this.activeNumber = 3;
      break;
    }
  }

  ngOnInit(): void {
  }

}
