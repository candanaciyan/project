import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
import { SuccessResponse } from '../model/successResponse';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  editingProduct: Product | null = null;
  http: any;

  constructor(
    private httpClient: HttpClient,
  ) { }



  getAllProducts():Observable<Product[]> {
    return this.httpClient.get<Product[]>('/product/all');
  }
  createProduct(product: Product): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>('/product/create', product);
  }

  deleteFruit(id: number): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>('/fruit/delete', { id } );
  }
  accept(fruitId: number, count: number): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>('/fruit/accept', {fruitId, count});
  }
  saleProduct(fruitId: number, count: number): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>('/fruit/sale', {fruitId, count});
  }
  getFruitCount(id: number): Observable<number> {
    return this.http.get<number>('/fruit/count/' + id);
  }

}
