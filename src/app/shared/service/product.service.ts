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

  deleteProduct(id: number): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>('/product/delete', { id } );
  }
  // cagiracagimiz urlyi vardik ve buraya fruitin id sini verecegiz
  // id diye yazarsan 3-5 gibi id degerini yazar
  // { id } boyle koyarsan json objesi icinde id keyine karsilik id degiskeninin degerini icine  koyuyor oluyor
  // ve json gonderiyor bu onemli
  

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
