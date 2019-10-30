import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserAccessService {

  private userUrl: string;
  private controlUrl: string;

  constructor(private http: HttpClient) {
    this.userUrl = 'http://localhost:8080/api-techRing/auth/';
    this.controlUrl = 'http://localhost:8080/api-techRing/contact/';
  }

  public saveCustomer(username, email, password) {
    return this.http.post(this.userUrl + 'create/customer', { "username": username, "email": email, "password": password });
  }

  public saveVendor(email, username, password, street1, street2, city, province, tel, mobile, card_no) {
    return this.http.post(this.userUrl + 'create/vendor', { "email": email, "username": username, "password": password, "street1": street1, "street2": street2, "city": city, "province": province, "tel": tel, "mobile": mobile, "card_no": card_no });
  }

  public login(username, password) {
    // return this.http.post(this.userUrl+'login', [username, password]);
    // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    // return this.http.get(this.userUrl+'login', { headers }).pipe(
    //   map(
    //     userData => {
    //       sessionStorage.setItem('username', username);
    //       let authString = 'Basic ' + btoa(username + ':' + password);
    //       sessionStorage.setItem('basicauth', authString);
    //       return userData;
    //     }
    //   )

    // );
    return this.http.post(this.userUrl + 'login', { "username": username, "password": password }).pipe(
      map(
        userData => {
          if (userData["responseCode"] == "111") {
            sessionStorage.setItem('username', username);
            sessionStorage.setItem('email', 'virajlakshitha39@gmail.com');
            
          }
          return userData;
        }
      )
    );
  }

  public addContact(email, message) {
    return this.http.post(this.controlUrl, [email, message]);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('username')
  }
}
