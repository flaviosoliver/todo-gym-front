import { Component, OnInit } from '@angular/core';
import { ExercisesService } from 'src/app/modules/exercises/exercises.service';
import { Exercise } from 'src/app/modules/exercises/interface/exercise.interface';
import { SnackBarTypeEnum } from 'src/app/modules/shared/enums/snack-bar-type.enum';
import { SnackBarCustomService } from 'src/app/modules/shared/service/snack-bar-custom.service';
import { ExerciseItemComponent } from '../components/exercise-item/exercise-item.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-exercises-list',
  templateUrl: './exercises-list.component.html',
  styleUrls: ['./exercises-list.component.scss'],
})
export class ExercisesListComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openDialog() {
    const dialogRef = this.dialog.open(ExerciseItemComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
