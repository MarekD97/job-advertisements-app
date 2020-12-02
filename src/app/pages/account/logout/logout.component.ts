import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(public fs: FirebaseService, public router: Router) {

  }

  ngOnInit(): void {
  }

  onLogoutClick() {
    this.fs.signOut();
    this.router.navigate(['/']);
  }

}
