import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuccessResponse } from '../model/successResponse';
import { Observable } from 'rxjs';
import { Shelf } from '../model/shelf';

@Injectable({
  providedIn: 'root'
})
export class ShelfService {
  
  constructor(
    private http: HttpClient,
  ) { }



  getAllShelves(): Observable<Shelf[]> {
    return this.http.get<Shelf[]>('/box/');
  }
  // tum boxlari ceken metot bu geriye box arrayi dondurecek 
  // parametre vermeyecegiz 
  


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
