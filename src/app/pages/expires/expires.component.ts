import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UnderConstructionComponent } from '../components/under-construction/under-construction.component';

@Component({
  selector: 'app-expires',
  templateUrl: './expires.component.html',
  styleUrls: ['./expires.component.scss'],
})
export class ExpiresComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  text: string =
    'Por aqui será possível consultar e gerir seus planos de treinos já espirados.';

  ngOnInit() {
    this.openDialog();
  }

  openDialog() {
    const dialog = this.dialog.open(UnderConstructionComponent, {
      data: this.text,
    });
  }
}
