import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangePasswordRequest } from '../dto/changePasswordRequest';
import { SuccessResponse } from '../model/successResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  createUser(createForm: any):Observable<any> {
    return this.httpClient.post<any>('/user/create', createForm);
  }

  public changePassword(dto: ChangePasswordRequest): Observable<SuccessResponse> {
    return this.httpClient.post<SuccessResponse>("/changepassword", dto);
  }
  //post ile olacak donus tipi de sunucu tarafinda tanimladigimiz default donus tipi var
  //fakat bu dto heryerde ortak olarak kullanilacak bir dto oldugu icin yerini shared tarafinda olmasi gerkiyor core da degil

}
