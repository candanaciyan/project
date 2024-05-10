import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  name= "";
  surname= "";
  email = "";
  password = "";  
  loggedIn = false;
  token = "";
  userId = "";
  role = "";
  constructor(
    private http: HttpClient,

  ) { }
  
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>('/login', { email: email, password :password }).pipe(
      map(data => this.parseLoginResponse(data, email, password))
    );
    //pipe HTTP isteğinin sonucunu işlemek için kullanılır.
    // map() operatörü kullanılarak gelen veri dönüştürülür veya işlenir.

  }
  parseLoginResponse(data: any, email: string, password: string) {
    this.loggedIn = true;
    this.token = data.token;
    this.email = email;
    this.password = password;
    localStorage.setItem('token', data.token);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    let payload = this.parseJwt(this.token);
    this.name = payload.name;
    this.surname = payload.surname;
    this.role = payload.role;
    this.userId = payload.userId;
    return data;
  }
  logout() {
    this.loggedIn = false;
    this.token = "";
    this.email = "";
    this.password = "";
    this.userId = "";
    this.role = "";
    localStorage.clear();
  }
  relogin(): Observable<any> {
    return this.login(this.email, this.password);
  }
  parseJwt(token: string) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  userHasRole(roleName: string): boolean {
    let hasRole = false;
    if (this.role === roleName) {
      hasRole = true;
    }
    return hasRole;
  }

  getRole(): string {
    return this.role;
  }
  
}
