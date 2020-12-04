import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isOpen = false;

  constructor(public fs: FirebaseService, public router: Router) {

  }

  ngOnInit(): void {
  }

  onBurgerClick(): void {
    this.isOpen = !this.isOpen;
  }

  onMenuClick(): void {
    this.isOpen = false;
  }

}
