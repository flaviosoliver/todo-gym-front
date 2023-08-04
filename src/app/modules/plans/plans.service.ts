import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plan } from './interface/plan.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlansService {
  constructor(private http: HttpClient) {}

  getAllPlansByUser(): Observable<Plan[]> {
    const result = this.http
      .get<Plan[]>(`${environment.apiUrl}/plans`)
      .pipe((response) => response);

    return result;
  }
}
