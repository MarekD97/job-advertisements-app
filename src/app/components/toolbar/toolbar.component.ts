import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  @Output() onFilterChange: EventEmitter<void> = new EventEmitter();
  public categories: string[] = [
    'Sprzątanie',
    'Opieka nad zwierzętami',
    'Opieka nad dziećmi',
    'Opieka nad niepełnosprawnymi',
    'Ogrodnictwo',
    'Udzielanie korepetycji',
    'Transport',
    'Praca sezonowa',
    'Inne'
  ];
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      searchText: new FormControl(''),
      category: new FormControl('all'),
      age: new FormControl(false),
      sort: new FormControl('latest')
    });
  }

  ngOnInit(): void {
  }

  updateFilter() {
    this.onFilterChange.emit(this.form.value);
  }
}
