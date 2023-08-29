import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../app-material.module';
import { ExerciseCardComponent } from './components/exercise-card/exercise-card.component';
import { NoExerciseComponent } from './components/no-exercise/no-exercise.component';
import { YouTubePlayerModule } from '@angular/youtube-player';

@NgModule({
  declarations: [ExerciseCardComponent, NoExerciseComponent],
  imports: [CommonModule, MaterialModule, YouTubePlayerModule],
  exports: [ExerciseCardComponent, NoExerciseComponent],
})
export class ExercisesModule {}
