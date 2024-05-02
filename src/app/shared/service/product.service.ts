import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  editingProduct: Product | null = null;

  constructor(
    private httpClient: HttpClient,
  ) { }


  createProduct(madeProduct: any):Observable<any> {
    return this.httpClient.post<any>('/product/create', madeProduct);
  }

  getAllProducts():Observable<Product[]> {
    return this.httpClient.get<Product[]>('/product/all');
  }
  createFruit(fruit: Fruit): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>('/fruit/create', fruit);
  }

  getAllFruits(): Observable<Fruit[]> {
    return this.http.get<Fruit[]>('/fruit/');
  }
  deleteFruit(id: number): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>('/fruit/delete', { id } );
  }
  accept(fruitId: number, count: number): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>('/fruit/accept', {fruitId, count});
  }
  sale(fruitId: number, count: number): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>('/fruit/sale', {fruitId, count});
  }
  getFruitCount(id: number): Observable<number> {
    return this.http.get<number>('/fruit/count/' + id);
  }

}
