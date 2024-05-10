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
    return this.http.get<Shelf[]>('/shelf/');
  }
  // tum shelfleri ceken metot bu geriye shelf arrayi dondurecek 
  // parametre yok 
  

  createShelf(count: number,capacity: number): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>('/shelf/create', {count,capacity});
  }
   

  deleteShelf(id: number): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>('/shelf/delete', {id});
  }

}
