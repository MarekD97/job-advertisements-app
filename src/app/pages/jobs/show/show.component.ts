import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowJobComponent implements OnInit {
  private routeSub: Subscription;
  public jobId: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.jobId = params['id'];
    })
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

}
