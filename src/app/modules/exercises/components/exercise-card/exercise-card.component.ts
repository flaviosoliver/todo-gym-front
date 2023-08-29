import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ExerciseItemComponent } from 'src/app/pages/components/exercise-item/exercise-item.component';
import { Exercise } from '../../interface/exercise.interface';

@Component({
  selector: 'app-exercise-card',
  templateUrl: './exercise-card.component.html',
  styleUrls: ['./exercise-card.component.scss'],
})
export class ExerciseCardComponent implements OnInit {
  @Input() name: string = '';
  @Input() exercise!: Exercise;
  @Input() focusMuscle: string[] = [];
  @Input() image: string = '';
  @Input() video: string = '';
  @Input() notes: string = '';
  @Output() reloadCards = new EventEmitter<boolean>();
  videoId: string = '';

  constructor(public dialog: MatDialog) {}

  extractVideoId(link: string) {
    if (link) {
      const url = new URL(link);
      const match = url.searchParams.get('v') || url.pathname.split('/').pop();
      if (match) {
        this.videoId = match;
        return match;
      }
    }
    return null;
  }

  ngOnInit() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
    this.extractVideoId(this.video);
  }

  openDialog() {
    console.log('exercise', this.exercise);
    const dialogRef = this.dialog.open(ExerciseItemComponent, {
      data: this.exercise,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });

    dialogRef.componentInstance.reloadCards.subscribe(() => {
      this.reloadCards.emit(true);
      dialogRef.close();
    });
  }
}
