import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBar,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss'],
})
export class SnackBarComponent implements OnInit {
  constructor(
    public snackBarRef: MatSnackBarRef<SnackBarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {}

  ngOnInit() {}

  get getIcon() {
    switch (this.data.snackType) {
      case 'SUCCESS':
        return 'done';
      case 'ERROR':
        return 'error';
      case 'INFO':
        return 'info';
      default:
        return 'done';
    }
  }

  closeSnackbar() {
    this.data.dismiss();
  }
}
