import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() filterCategory: EventEmitter<void> = new EventEmitter();
  @Output() filterAge: EventEmitter<void> = new EventEmitter();
  @Output() sortType: EventEmitter<void> = new EventEmitter();
  public categories: string[] = [
    'Sprzątanie',
    'Opieka nad zwierzętami',
    'Opieka nad dziećmi',
    'Opieka nad osobami niepełnosprawnymi',
    'Ogrodnictwo',
    'Udzielanie korepetycji',
    'Transport',
    'Praca sezonowa',
    'Inne'
  ];
  constructor() { }

  ngOnInit(): void {
  }

  sortChange(event: any): void {
    this.sortType.emit(event.target.value);
  }

  filterCategoryChange(event: any): void {
    this.filterCategory.emit(event.target.value);
  }

  filterAgeChange(event: any): void {
    this.filterAge.emit(event.target.checked);
  }
}
