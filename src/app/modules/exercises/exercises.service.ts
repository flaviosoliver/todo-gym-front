import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Exercise } from './interface/exercise.interface';
import { environment } from 'src/environments/environment';

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
}
