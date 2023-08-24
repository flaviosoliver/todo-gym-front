import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-select-multi',
  templateUrl: './select-multi.component.html',
  styleUrls: ['./select-multi.component.scss'],
})
export class SelectMultiComponent implements OnInit {
  @Input() label: string = '';
  @Input() optionsList: any[] = [];
  @Output() selectedItems = new EventEmitter<any[]>();
  myForm!: FormGroup;
  options = new FormControl('');
  ShowFilter = true;
  dropdownSettings: IDropdownSettings = {};
  optionsChecked: string[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      defaultOpen: false,
      idField: 'id',
      textField: 'text',
      selectAllText: 'Selecionar Todos',
      unSelectAllText: 'Limpar Seleção',
      searchPlaceholderText: 'Pesquisar',
      enableCheckAll: true,
      itemsShowLimit: 2,
      allowSearchFilter: this.ShowFilter,
    };
    this.optionsList;
    this.myForm = this.fb.group({
      option: [this.selectedItems],
    });
  }

  onItemSelect(item: any) {
    this.optionsChecked.push(item.text);
    this.selectedItems.emit(this.optionsChecked);
  }

  onSelectAll(items: any[]) {
    items.forEach((item) => {
      item.text = this.optionsChecked.push(item.text);
    });

    this.selectedItems.emit(this.optionsChecked);
  }

  onDeSelectAll(event: any) {
    this.optionsChecked = [];
  }

  onItemDeSelect(item: any) {
    let forRemove = item.text;
    this.optionsChecked = this.optionsChecked.filter(
      (i) => !forRemove.includes(i)
    );
    this.selectedItems.emit(this.optionsChecked);
  }

  toogleShowFilter() {
    this.ShowFilter = !this.ShowFilter;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, {
      allowSearchFilter: this.ShowFilter,
    });
  }
}
