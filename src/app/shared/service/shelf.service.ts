import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuccessResponse } from '../model/successResponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShelfService {
  http: any;

  constructor(
    private httpClient: HttpClient,
  ) { }



  getAllBoxes(): Observable<Box[]> {
    return this.http.get<Box[]>('/box/');
  }
  createBoxes(capacity: number, count: number): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>('/box/create', {capacity, count});
  }
  deleteBox(id: number): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>('/box/delete', {id});
  }
  updateBox(id: number, capacity: number): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>('/box/update', {id, capacity});
  }

}
