import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { HeaderComponent} from '../../components/header/header.component';
import { SearchbarComponent} from '../../components/searchbar/searchbar.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public data: any;
  constructor(private fs: FirebaseService) { }

  ngOnInit(): void {
    this.fs.getLastAdvertisements(3).subscribe(data => this.data=data);
  }

}
