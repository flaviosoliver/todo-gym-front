import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CreateExerciseDto } from 'src/app/modules/exercises/dto/create-exercise.dto';
import { UpdateExerciseDto } from 'src/app/modules/exercises/dto/update-exercise.dto';
import { ExercisesService } from 'src/app/modules/exercises/exercises.service';
import { Exercise } from 'src/app/modules/exercises/interface/exercise.interface';
import { FocusEnum } from 'src/app/modules/shared/enums/focus.enum';
import { SnackBarTypeEnum } from 'src/app/modules/shared/enums/snack-bar-type.enum';
import { SelectMulti } from 'src/app/modules/shared/interface/select-multi';
import { SnackBarCustomService } from 'src/app/modules/shared/service/snack-bar-custom.service';

@Component({
  selector: 'app-exercise-item',
  templateUrl: './exercise-item.component.html',
  styleUrls: ['./exercise-item.component.scss'],
})
export class ExerciseItemComponent implements OnInit {
  @Input() exercise?: Exercise;
  @Output() reloadCards = new EventEmitter<boolean>();
  label: string = '';
  focusMuscleList: SelectMulti[] = [
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
  selectedOptionsMuscles: any[] = [];
  dropdownSettings: IDropdownSettings = {};
  selectDefault: SelectMulti[] = [];
  exerciseForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    focusMuscle: [[], [Validators.required]],
    image: ['', [Validators.pattern(/\.(jpg|jpeg|png|gif|webp|svg)$/i)]],
    video: [
      '',
      [
        Validators.pattern(
          /(?:\?v=|\/embed\/|\/v\/|youtu\.be\/|\/e\/|watch\?v=)([^#\&\?]*).*/
        ),
      ],
    ],
    notes: [''],
  });
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private readonly exerciseService: ExercisesService,
    private snackBar: SnackBarCustomService,
    public dialogRef: MatDialogRef<ExerciseItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.exercise = this.data;
    console.log(this.exercise);
    this.dropdownSettings = {
      singleSelection: false,
      defaultOpen: true,
      idField: 'id',
      textField: 'text',
      selectAllText: 'Selecionar Todos',
      unSelectAllText: 'Limpar Seleção',
      searchPlaceholderText: 'Pesquisar',
      noDataAvailablePlaceholderText: 'Não existem opções',
      enableCheckAll: true,
      allowSearchFilter: true,
      clearSearchFilter: true,
      itemsShowLimit: 1,
    };
    if (this.exercise) {
      this.loadForm(this.exercise);
      console.log(this.exerciseForm);
      console.log(this.exerciseForm.status);
      console.log(this.exerciseForm.getRawValue());
      this.selectedOptionsMuscles = this.selectedOptionsMusclesFilter();
      this.label = 'Atualizando Exercício';
    } else {
      this.label = 'Criando Novo Exercício';
    }
  }

  loadForm(exercise: Exercise) {
    if (exercise) {
      this.exerciseForm.get('name')?.setValue(exercise.name);
      this.exerciseForm.get('focusMuscle')?.setValue(exercise.focusMuscle);
      this.exerciseForm.get('image')?.setValue(exercise.image);
      this.exerciseForm.get('video')?.setValue(exercise.video);
      this.exerciseForm.get('notes')?.setValue(exercise.notes);
      this.exerciseForm.markAsDirty();
    }
  }

  async save() {
    if (event) {
      event?.preventDefault();
    }

    this.isLoading = true;

    let exercise: Exercise = {
      id: this.exercise ? this.exercise.id : '',
      name: this.exerciseForm.get('name')?.value,
      focusMuscle: this.convertValues(),
      image: this.exerciseForm.get('image')?.value,
      video: this.exerciseForm.get('video')?.value,
      notes: this.exerciseForm.get('notes')?.value,
    };

    try {
      if (this.exercise && this.exercise.id) {
        exercise.id = this.exercise.id;
        await this.update(this.exercise.id, exercise).then((res) => {
          if (res) {
            this.snackBar.open(
              'Exercício atualizado',
              SnackBarTypeEnum.SUCCESS,
              'snack-success'
            );
          } else {
            this.snackBar.open(
              'Não foi possível salvar, tente novamente',
              SnackBarTypeEnum.ERROR,
              'snack-error'
            );
          }
        });
      } else {
        const newExercise: any = exercise;
        delete newExercise.id;
        console.log(newExercise);
        await this.create(newExercise).then((res) => {
          if (res) {
            this.snackBar.open(
              'Exercício criado',
              SnackBarTypeEnum.SUCCESS,
              'snack-success'
            );
          } else {
            this.snackBar.open(
              'Não foi possível salvar, tente novamente',
              SnackBarTypeEnum.ERROR,
              'snack-error'
            );
          }
        });
      }

      this.isLoading = false;
      this.reloadCards.emit(true);
    } catch (error) {
      console.error(error);

      this.isLoading = false;
      this.snackBar.open(
        'Não foi possível salvar, tente novamente',
        SnackBarTypeEnum.ERROR,
        'snack-error'
      );
    }
  }

  async create(exercise: CreateExerciseDto) {
    return await this.exerciseService.createExercise(exercise);
  }

  async update(id: string, exercise: UpdateExerciseDto) {
    return await this.exerciseService.updateExercise(id, exercise);
  }

  handleSelect(selectedOptions: string[]) {
    this.exerciseForm.get('focusMuscle')?.setValue(selectedOptions);
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onSelectedItemsChange(selectedItems: string[]): SelectMulti[] {
    const res = this.focusMuscleList.filter((item) =>
      selectedItems.includes(item.text)
    );

    this.selectDefault = res;

    if (!res) {
      return [];
    }
    return res;
  }

  public onFilterChange(item: any) {
    console.log('onFilterChange', item);
  }

  public onItemSelect(item: any) {
    console.log('onItemSelect', item);
  }

  public onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }

  public onDeSelect(item: any) {
    console.log('onDeSelect', item);
  }

  public onDeSelectAll(items: any) {
    console.log('onDeSelectAll', items);
  }

  public onDropDownClose(item: any) {
    console.log('onDropDownClose', item);
  }

  selectedOptionsMusclesFilter(): any[] {
    const prev: string[] = this.exerciseForm.get('focusMuscle')?.value;
    const filtered = this.focusMuscleList.filter((item) =>
      prev.includes(item.text)
    );
    console.log('selectedOptions', filtered);
    return filtered;
  }

  convertValues() {
    const output: string[] = [];
    const values = this.exerciseForm.get('focusMuscle')?.value;
    values.forEach((item: SelectMulti) => output.push(item.text));
    return output;
  }
}
