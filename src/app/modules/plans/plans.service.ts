import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Plan } from './interface/plan.interface';
import { environment } from 'src/environments/environment';
import { Observable, delay, mergeMap, retryWhen, throwError } from 'rxjs';
import { ParamsDto } from '../shared/dto/params.dto';
import { buildParams } from '../shared/utils/http-params.utils';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { CreatePlanDto } from './dto/create-plan.dto';

@Injectable({
  providedIn: 'root',
})
export class PlansService {
  private readonly maxRetries = 3;
  private readonly retryDelay = 1000;

  constructor(private http: HttpClient) {}

  getAllPlansByUser(): Observable<Plan[]> {
    const result = this.http.get<Plan[]>(`${environment.apiUrl}/plans`).pipe(
      retryWhen((errors) =>
        errors.pipe(
          mergeMap((error, count) => {
            if (count < this.maxRetries && this.shouldRetry(error)) {
              return Observable.create((observer: { next: () => any }) =>
                observer.next()
              );
            }
            return throwError(error);
          }),
          delay(this.retryDelay)
        )
      )
    );

    console.log(result);

    return result;
  }

  private shouldRetry(error: any): boolean {
    if (error.status === 401) {
      return true;
    }

    if (error.status >= 500 && error.status < 600) {
      return true;
    }

    if (error.message.includes('temporary')) {
      return true;
    }

    return false;
  }

  getByParams(params: ParamsDto): Observable<Plan[]> {
    console.log('params service', params);
    const result = this.http
      .get<Plan[]>(`${environment.apiUrl}/plans/search`, {
        params: buildParams(params),
      })
      .pipe((resp) => resp);
    return result;
  }

  getById(id: string): Observable<Plan> {
    const result = this.http
      .get<Plan>(`${environment.apiUrl}/plans/${id}`)
      .pipe((resp) => resp);
    return result;
  }

  async createPlan(plan: CreatePlanDto) {
    console.log('create plan', plan);
    try {
      await this.http
        .post<CreatePlanDto>(`${environment.apiUrl}/plans`, plan)
        .toPromise();

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async updatePlan(id: string, plan: UpdatePlanDto) {
    console.log('update plan', plan);
    try {
      await this.http
        .patch<UpdatePlanDto>(`${environment.apiUrl}/plans/${id}/update`, plan)
        .toPromise();

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
