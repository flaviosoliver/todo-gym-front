import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';
import { SnackBarTypeEnum } from '../enums/snack-bar-type.enum';

@Injectable({
  providedIn: 'root',
})
export class SnackBarCustomService {
  constructor(private snackBar: MatSnackBar) {}

  public open(
    message: string,
    snackType: SnackBarTypeEnum,
    panelClass: string
  ): void {
    this.snackBar.openFromComponent(SnackBarComponent, {
      panelClass: panelClass,
      duration: 10000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      data: { message: message, snackType: snackType },
    });
  }
}
