import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Select } from '../../interface/select';

@Component({
  selector: 'app-select-multi',
  templateUrl: './select-multi.component.html',
  styleUrls: ['./select-multi.component.scss'],
})
export class SelectMultiComponent implements OnInit {
  @Input() label: string = '';
  @Input() optionsList: any[] = [];
  @Input() itemsShowLimit: number = 1;
  @Input() selectedItems: any[] = [];
  @Output() selectedItemsChange = new EventEmitter<any[]>();
  myForm!: FormGroup;
  options = new FormControl('');
  ShowFilter = true;
  dropdownSettings: IDropdownSettings = {};

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
      itemsShowLimit: this.itemsShowLimit,
      allowSearchFilter: this.ShowFilter,
    };
    this.optionsList;
    this.myForm = this.fb.group({
      option: [this.selectedItemsChange],
    });
  }

  onItemSelect(item: any) {
    this.selectedItems.push(item.text);
    this.selectedItemsChange.emit(this.selectedItems);
  }

  onSelectAll(items: any[]) {
    items.forEach((item) => {
      item.text = this.selectedItems.push(item.text);
    });

    this.selectedItemsChange.emit(this.selectedItems);
  }

  onDeSelectAll(event: any) {
    this.selectedItems = [];
  }

  onItemDeSelect(item: any) {
    let forRemove = item.text;
    this.selectedItems = this.selectedItems.filter(
      (i) => !forRemove.includes(i)
    );
    this.selectedItemsChange.emit(this.selectedItems);
  }

  toogleShowFilter() {
    this.ShowFilter = !this.ShowFilter;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, {
      allowSearchFilter: this.ShowFilter,
    });
  }
}
