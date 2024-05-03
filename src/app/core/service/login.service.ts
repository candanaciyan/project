import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  email = "";
  password = "";
  //responsetan gelen token bilgisini hem localstorage e hem de loginservice classinin token degiskenine yaziyorum
  loggedIn = false;
  token = "";
  userId = "";
  role = "";
  constructor(
    private http: HttpClient,

  ) { }


  //bu degiskenin projenin her yerinden ulasilmasini sagliyoruz
  //bunu niye yapiyorum cunku interceptorde request sunucuya gonderilirken requestin headerina burdaki token degiskeninin degerini okuyup eklemem gerekecek
  //tokeni gondermezsek sunucu artik cevap vermeyecek durumda olacak cunku artik security var
  //bu token her requestin headerinda gonderilmesi gerekiyor
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>('/login', { email: email, password :password }).pipe(
      map(data => this.parseLoginResponse(data, email, password))
    );
//     <> arasina donecek olan degeri girecegim.dto classi yaratmissam onu buraya yaziyorum dogrusu bu ama any yazarsam da ise yariyor bu javadaki object classi gibi heryola gidiyor
// () arasina bir suru parametre verebiliyoruz ilki url yaptik ikincisi body requestin bodysi ucuncusu ise options headerlari falan burda verebiliyoruz

  }

  //service claassinda subscribetan once calisanlari ekleyebiliyoruz
  //pipe ekliyoruz buraya ve icine yontemleri koyuyoruz bu yontemler subscribetan once calissin demis oluyoruz
  //once pipetaki metotlar calissin sonra sonra subscibe calissin demis olduk araya girdik
  //pipe yine observeri geri donduruyor bu metotlar cevap geldiginde rxjs metotlar bunlar
  //login componentin objesi subscribenin next veya errorindan once calisabiliyor ve buraya gelen cevabi degistirebiliyor
  //map ile datayi alacagiz ve map icin icine metot tanimlayacagiz ...map cevabi degistiren bir metot.
  //login degiskenini true yapicaz ve bunlarin saklanmasi saglayacagiz
  //responsetan gelen tokeni aliyoruz boylelikle ve localstoragete sakladik bu bilgileri
  //email ve passwordu de sakladik
  //datayi degistirmiyorum birebir geldigi haliyle geri gonderiyorum ama bilgileri sakliyorum bu arada

  parseLoginResponse(data: any, email: string, password: string) {
//     login oldugunda calisacak bir fonksiyon olacak bu
// parametreye email password e eklemek gerekli zorunlu kildi
// hata vdonmezse calisacak fonk bu

    this.loggedIn = true;
    this.token = data.token;
    this.email = email;
    this.password = password;
    localStorage.setItem('token', data.token);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    let payload = this.parseJwt(this.token);
    this.role = payload.role;//bunun icine de ekledik login response icine tokendan geleni degiskeinin icine saklamis olduk
    this.userId = payload.userId;//bunun icine de ekledik login response icine tokendan geleni degiskeinin icine saklamis olduk
    return data;//bu gerekli mi return olmasi digerinde yok
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
  // geriye boolean donecek
  // hasrole diye bir degiskenimiz olsun ve ilk degeri flase olsun
  // roller uzerinden foreach yaziyoruz her bir  rolu aliyorum arrow fonk ile
  // if rol uc esit roleAdi ise ===
  // if dogru olursa hasrole true ya donsun demis olduk
  


}
