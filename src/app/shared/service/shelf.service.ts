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



  getAllShelves(): Observable<Box[]> {
    return this.http.get<Box[]>('/box/');
  }
  createShelf(capacity: number, count: number): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>('/box/create', {capacity, count});
  }
  deleteShelf(id: number): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>('/box/delete', {id});
  }
  updateShelf(id: number, capacity: number): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>('/box/update', {id, capacity});
  }

}
