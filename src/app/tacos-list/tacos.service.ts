import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AppInsights } from 'applicationinsights-js';
import { Taco } from './taco.model';

const TACOS_API = 'https://tacofancy-api.azurewebsites.net/api';
@Injectable({
  providedIn: 'root'
})
export class TacosService {
  constructor(private http: HttpClient) {}

  getTacos(sort, order, page) {
    return this.http.get<Array<Taco>>(
      `${TACOS_API}/recipes?sort=${sort}&order=${order}&page=${page + 1}`
    );
  }

  getTaco(id) {
    return this.http.get<Taco>(`${TACOS_API}/recipes/${id}`);
  }

  deleteTaco(taco: Taco) {
    return this.http.delete(`${TACOS_API}/recipes/${taco._id}`);
  }

  addTaco(taco: Taco) {
    return this.http.post<Taco>(`${TACOS_API}/recipes/`, taco);
  }

  updateTaco(taco: Taco) {
    return this.http.put<Taco>(`${TACOS_API}/recipes/${taco._id}`, taco);
  }
}
