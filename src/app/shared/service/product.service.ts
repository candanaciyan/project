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
  
  constructor(
    private http: HttpClient,
  ) { }

  getAllProducts():Observable<Product[]> {
    return this.http.get<Product[]>('/product/all');
  }
  createProduct(product: Product): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>('/product/create', product);
  }

  updateProduct(product: Product): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>('/product/update', product);
  }

  deleteProduct(id: number): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>('/product/delete', { id } );
  } 

  acceptProduct(productId: number, count: number): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>('/product/accept', {productId, count});
  }
  saleProduct(productId: number, count: number): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>('/product/sale', {productId, count});
  }
  getProductCount(id: number): Observable<number> {
    return this.http.get<number>('/product/count/' + id);
  }

}
