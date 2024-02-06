import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-bar',
  templateUrl: './settings-bar.component.html',
  styleUrls: ['./settings-bar.component.scss']
})
export class SettingsBarComponent implements OnInit {
  public selectedId: number;

  constructor(private readonly router: Router) {
  }

  ngOnInit(): void {
    const urlMap: { [key: string]: number } = {
      '/account/settings': 0,
      '/job/create': 1,
      '/messages': 2,
      '/account/profile': 3,
    };

    this.selectedId = urlMap[this.router.url] || 0;
  }

}
