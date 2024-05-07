import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangePasswordRequest } from '../dto/changePasswordRequest';
import { SuccessResponse } from '../model/successResponse';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  editingUser: User | null = null;

  constructor(
    private http: HttpClient,
  ) { }

  createUser(createForm: any):Observable<any> {
    return this.http.post<any>('/user/create', createForm);
  }
  getAllUsers():Observable<User[]> {
    return this.http.get<User[]>('/user/all');
  }

  deleteUser(email: string): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>('/user/delete', { email } );
  }
  updateUser(email: string): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>('/user/update', {email});
  }


  public changePassword(dto: ChangePasswordRequest): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>("/user/changepassword", dto);
  }


 
  public changePasswordAdmin(email: string): Observable<SuccessResponse> {
    return this.http.post<SuccessResponse>("/user/passwordadmin", { email });
  }
  //post ile olacak donus tipi de sunucu tarafinda tanimladigimiz default donus tipi var
  //fakat bu dto heryerde ortak olarak kullanilacak bir dto oldugu icin yerini shared tarafinda olmasi gerkiyor core da degil

}
