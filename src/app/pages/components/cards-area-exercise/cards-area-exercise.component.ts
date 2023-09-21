import { Component, OnInit } from '@angular/core';
import { ExercisesService } from 'src/app/modules/exercises/exercises.service';
import { Exercise } from 'src/app/modules/exercises/interface/exercise.interface';
import { FocusEnum } from 'src/app/modules/shared/enums/focus.enum';
import { SnackBarTypeEnum } from 'src/app/modules/shared/enums/snack-bar-type.enum';
import { ParamsDto } from 'src/app/modules/shared/dto/params.dto';
import { SnackBarCustomService } from 'src/app/modules/shared/service/snack-bar-custom.service';
import { buildParams } from 'src/app/modules/shared/utils/http-params.utils';

@Component({
  selector: 'app-cards-area-exercise',
  templateUrl: './cards-area-exercise.component.html',
  styleUrls: ['./cards-area-exercise.component.scss'],
})
export class CardsAreaExerciseComponent implements OnInit {
  exercises: Exercise[] = [];
  isLoading: boolean = false;
  params: ParamsDto = {};
  isSearch = false;
  focusMuscleList: any[] = [
    { id: 1, text: FocusEnum.ABS },
    { id: 2, text: FocusEnum.AEROBIC },
    { id: 3, text: FocusEnum.FOREARM },
    { id: 4, text: FocusEnum.BICEPS },
    { id: 5, text: FocusEnum.BACK },
    { id: 6, text: FocusEnum.BUTTOCKS },
    { id: 7, text: FocusEnum.SHOULDERS },
    { id: 8, text: FocusEnum.CALVES },
    { id: 9, text: FocusEnum.CHEST },
    { id: 10, text: FocusEnum.LEGS },
    { id: 11, text: FocusEnum.TRICEPS },
  ];

  constructor(
    private exercisesService: ExercisesService,
    private snackBar: SnackBarCustomService
  ) {}

  async ngOnInit() {
    await this.reloadList();
  }

  async handleSearch(term: string) {
    this.params.name = term;
    if (term && term.length >= 3) {
      this.filter(term);
    } else {
      this.params.name = '';
      this.filter('');
    }
  }

  async handleSelect(selectedOptions: string[]) {
    this.params.focusMuscle = selectedOptions;
    this.filter(undefined, selectedOptions);
  }

  async filter(name?: string, focusMuscle?: string[]) {
    this.isSearch = true;
    const params = new ParamsDto({
      name: name ?? this.params.name,
      focusMuscle: focusMuscle ?? this.params.focusMuscle,
    });

    this.isLoading = true;
    await this.findExercises(params);
  }

  async getAllExercises() {
    try {
      this.isLoading = true;
      const result = await this.exercisesService.getAll().toPromise();
      if (result && result.length > 0) {
        this.exercises = result;
      } else {
        this.exercises = [];
      }
    } catch (error) {
      console.error(error);
      this.snackBar.open(
        'Recarregue a página e tente novamente',
        SnackBarTypeEnum.ERROR,
        'snack-error'
      );
    } finally {
      this.isLoading = false;
    }
  }

  async findExercises(params: ParamsDto): Promise<Exercise[]> {
    console.log(params);
    const result = await this.exercisesService.getByParams(params).toPromise();
    this.isLoading = false;
    return (this.exercises = result && result.length > 0 ? result : []);
  }

  async reloadList() {
    const params = {
      name: '',
      focusMuscle: [],
    };
    await this.findExercises(params);
  }
}
