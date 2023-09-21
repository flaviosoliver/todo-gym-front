import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgSelectConfig } from '@ng-select/ng-select';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { ExercisesService } from 'src/app/modules/exercises/exercises.service';
import { Exercise } from 'src/app/modules/exercises/interface/exercise.interface';
import { CreatePlanDto } from 'src/app/modules/plans/dto/create-plan.dto';
import { UpdatePlanDto } from 'src/app/modules/plans/dto/update-plan.dto';
import { Plan } from 'src/app/modules/plans/interface/plan.interface';
import { PlansService } from 'src/app/modules/plans/plans.service';
import { FocusEnum } from 'src/app/modules/shared/enums/focus.enum';
import { SnackBarTypeEnum } from 'src/app/modules/shared/enums/snack-bar-type.enum';
import { Select } from 'src/app/modules/shared/interface/select';
import { Training } from 'src/app/modules/shared/interface/training.interface';
import { SnackBarCustomService } from 'src/app/modules/shared/service/snack-bar-custom.service';

@Component({
  selector: 'app-plan-item',
  templateUrl: './plan-item.component.html',
  styleUrls: ['./plan-item.component.scss'],
})
export class PlanItemComponent implements OnInit, OnChanges {
  plan?: Plan;
  label: string = '';
  isUpdate: boolean = false;
  isLoading: boolean = false;
  planId: string = '';
  userId: string = '';
  cardTitle: string = '';
  exercises: Exercise[] = [];
  exercisesPlan: Training[] = [];
  idExerciseInTraining: number = 0;
  canViewExercises: boolean = false;
  planForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    focusMuscle: [[]],
    expiresIn: [new Date(), Validators.required],
    training: this.formBuilder.array([]),
  });
  focusMuscleList: Select[] = [
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
  exercisesList: Select[] = [];
  selectedOptionsMuscles: any[] = [];
  dropdownSettings: IDropdownSettings = {};
  dropdownSingleSettings: IDropdownSettings = {};
  selectDefault: Select[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private plansService: PlansService,
    private exercisesService: ExercisesService,
    private snackBar: SnackBarCustomService,
    private route: ActivatedRoute,
    private ngSelectConfig: NgSelectConfig,
    private readonly router: Router,
    private readonly authService: AuthService
  ) {
    this.route.params.subscribe((params: Params) => {
      this.planId = params['id'];
      if (this.planId) {
        this.isUpdate = true;
      }
    });

    this.ngSelectConfig.notFoundText = 'Nenhum exercício encontrado';
    this.ngSelectConfig.placeholder = 'exercício';
    this.ngSelectConfig.clearAllText = 'Limpar Seleção';
  }

  async ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      defaultOpen: false,
      idField: 'id',
      textField: 'text',
      selectAllText: 'Selecionar Todos',
      unSelectAllText: 'Limpar Seleção',
      searchPlaceholderText: 'Pesquisar',
      noDataAvailablePlaceholderText: 'Não existem opções',
      enableCheckAll: true,
      allowSearchFilter: true,
      clearSearchFilter: true,
      itemsShowLimit: 2,
    };
    if (this.planId) {
      await this.getPlan(this.planId);
      if (this.plan) {
        this.loadForm(this.plan);
      }
      console.log(this.plan);
      console.log(this.planForm.status);
      console.log(this.planForm.getRawValue());
      this.selectedOptionsMuscles = this.selectedOptionsMusclesFilter();
      this.label = 'Atualizando Plano de Treino';
    } else {
      this.label = 'Criando Novo Plano de Treino';
    }
    await this.getAllExercises();
    console.log(this.planForm);
    console.log(this.training);
    this.userId = this.getUser();
    this.canViewExercises =
      this.plan && this.plan.training.length > 0 ? true : false;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    console.log('mudou alguma coisa');
  }

  getUser() {
    return this.authService.getUserId();
  }

  async getPlan(id: string) {
    this.isLoading = true;
    const result = await this.plansService.getById(id).toPromise();
    if (result) {
      this.plan = result;
      this.exercisesPlan = result?.training;
      this.isLoading = false;
    }
  }

  async getAllExercises() {
    try {
      this.isLoading = true;
      const result = await this.exercisesService.getAll().toPromise();
      if (result && result.length > 0) {
        this.exercises = result;
        this.generateListExercises(result);
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

  loadForm(plan: Plan) {
    if (plan) {
      this.planForm.get('name')?.setValue(plan.name);
      this.planForm.get('focusMuscle')?.setValue(plan.focusMuscle);
      this.planForm.get('expiresIn')?.setValue(new Date(plan.expiresIn));

      this.loadTraining(plan.training);
    }
  }

  loadTraining(training: Training[]) {
    const trainingArray = this.planForm.get('training') as FormArray;

    training.forEach((exercise) => {
      const trainingControl = this.formBuilder.group({
        exerciseId: [exercise.exerciseId],
        exerciseName: [exercise.exerciseName],
        series: [exercise.series],
        repetitions: [exercise.repetitions],
        load: [exercise.load],
        notes: [exercise.notes],
      });

      trainingArray.push(trainingControl);
    });
  }

  get training() {
    return this.planForm.controls['training'] as FormArray;
  }

  get trainingGroup() {
    return this.training.controls;
  }

  addExercise(): void {
    const trainingForm = this.formBuilder.group({
      exerciseId: [''],
      exerciseName: [''],
      series: [''],
      repetitions: [''],
      load: [''],
      notes: [''],
    });

    this.canViewExercises = true;

    this.training.push(trainingForm);
  }

  removeExercise(index: number) {
    this.training.removeAt(index);
  }

  getTrainingControls() {
    return (this.planForm.get('training') as FormArray).controls;
  }

  handleSelect(selectedOptions: string[]) {
    this.planForm.get('focusMuscle')?.setValue(selectedOptions);
  }

  generateListExercises(exercises: Exercise[]) {
    if (exercises && exercises.length > 0) {
      exercises.forEach((exe, i) =>
        this.exercisesList.push({
          id: i,
          text: exe.name,
          ref: exe.id,
          group: exe.focusMuscle.toString(),
        })
      );
    }
    console.log(this.exercisesList);
  }

  onSelectedItemsChange(selectedItems: string[]): Select[] {
    const res = this.focusMuscleList.filter((item) =>
      selectedItems.includes(item.text)
    );

    this.selectDefault = res;

    if (!res) {
      return [];
    }
    return res;
  }

  customSearch(term: string, exercise: Exercise) {
    term = term.toLowerCase();
    console.log(exercise);
    return (
      exercise.name.toLowerCase().indexOf(term) > -1 ||
      exercise.focusMuscle.toString() === term
    );
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
    const prev: string[] = this.planForm.get('focusMuscle')?.value;
    const filtered = this.focusMuscleList.filter((item) =>
      prev.includes(item.text)
    );
    console.log('selectedOptions', filtered);
    return filtered;
  }

  outputMusclesSelected() {
    const output: string[] = [];
    const values = this.planForm.get('focusMuscle')?.value;
    values.forEach((item: Select) => output.push(item.text));
    return output;
  }

  onCancelClick() {
    this.router.navigate(['plans/']);
  }

  async onSubmit() {
    if (event) {
      event?.preventDefault();
    }

    this.isLoading = true;

    let plan: Plan = {
      id: this.planId ? this.planId : '',
      name: this.planForm.get('name')?.value,
      focusMuscle: this.outputMusclesSelected(),
      expiresIn: this.planForm.get('expiresIn')?.value,
      userId: this.userId,
      training: this.planForm.get('training')?.value,
    };

    console.log('submit', plan);

    try {
      if (this.plan && this.plan.id) {
        plan.id = this.plan.id;
        await this.update(this.plan.id, plan).then((res) => {
          if (res) {
            this.snackBar.open(
              'Plano de Treino atualizado',
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
        const newPlan: any = plan;
        delete newPlan.id;
        console.log(newPlan);
        await this.create(newPlan).then((res) => {
          if (res) {
            this.snackBar.open(
              'Plano de Treino criado',
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
      this.router.navigate(['plans/']);
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

  async create(plan: CreatePlanDto) {
    return await this.plansService.createPlan(plan);
  }

  async update(id: string, plan: UpdatePlanDto) {
    return await this.plansService.updatePlan(id, plan);
  }

  // [class.is-invalid]="planForm.get('exerciseId')?.errors?.['required'] && planForm.get('exerciseId')?.touched"
}
