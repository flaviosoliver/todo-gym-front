import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() placeholder: string = '';
  @Output() search = new EventEmitter<string>();
  term = '';

  constructor() {}

  ngOnInit() {}

  filter(event: any) {
    const term = event.target.value;
    if (term && term.length >= 3) {
      this.search.emit(term);
    } else {
      this.search.emit('');
    }
  }
}
