import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
  @Input() item: any;
  isdeleteWindowVisible = false;
  constructor(public fs: FirebaseService, public router: Router) { }

  ngOnInit(): void {
  }

  formatDate(dateToFormat): string {
    moment.locale('pl');
    const date = moment(dateToFormat.toDate());
    return date.format('DD MMMM yyyy, HH:mm');
  }

  onDeleteClick(id: string): void {
    this.fs.deleteAdvertisement(id);
  }
  onEditClick(id: string): void {
    this.router.navigate(['/jobs/edit/' + id]);
  }

}
