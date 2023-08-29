import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExerciseItemComponent } from 'src/app/pages/components/exercise-item/exercise-item.component';

@Component({
  selector: 'app-no-exercise',
  templateUrl: './no-exercise.component.html',
  styleUrls: ['./no-exercise.component.scss'],
})
export class NoExerciseComponent implements OnInit {
  @Input() isSearch: boolean = false;
  @Output() reloadCards = new EventEmitter<boolean>();

  constructor(public dialog: MatDialog) {}

  ngOnInit() {}

  openDialog() {
    const dialogRef = this.dialog.open(ExerciseItemComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });

    dialogRef.componentInstance.reloadCards.subscribe(() => {
      window.location.reload();
      dialogRef.close();
    });
  }
}
