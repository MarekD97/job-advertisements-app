import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isOpen: boolean = false;
  
  constructor(public fs: FirebaseService, public router: Router) {

  }

  ngOnInit(): void {
  }

  onBurgerClick() {
    this.isOpen = !this.isOpen;
  }

  onMenuClick() {
    this.isOpen = false;
  }

}
