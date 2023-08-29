import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise } from './interface/exercise.interface';
import { environment } from 'src/environments/environment';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { ParamsDto } from '../shared/dto/params.dto';
import { buildParams } from '../shared/utils/http-params.utils';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Injectable({
  providedIn: 'root',
})
export class ExercisesService {
  constructor(private http: HttpClient) {}

  getExerciseById(id: string): Observable<Exercise> {
    const result = this.http
      .get<Exercise>(`${environment.apiUrl}/exercises/${id}`)
      .pipe((resp) => resp);

    return result;
  }

  async createExercise(exercise: CreateExerciseDto) {
    console.log('create exercise', exercise);
    try {
      await this.http
        .post<CreateExerciseDto>(`${environment.apiUrl}/exercises`, exercise)
        .toPromise();

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  getAll(): Observable<Exercise[]> {
    const result = this.http
      .get<Exercise[]>(`${environment.apiUrl}/exercises`)
      .pipe((resp) => resp);
    return result;
  }

  getByParams(params: ParamsDto): Observable<Exercise[]> {
    const result = this.http
      .get<Exercise[]>(`${environment.apiUrl}/exercises/search`, {
        params: buildParams(params),
      })
      .pipe((resp) => resp);
    return result;
  }

  async updateExercise(id: string, exercise: UpdateExerciseDto) {
    console.log('update exercise', exercise);
    try {
      await this.http
        .patch<UpdateExerciseDto>(
          `${environment.apiUrl}/exercises/${id}/update`,
          exercise
        )
        .toPromise();

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
