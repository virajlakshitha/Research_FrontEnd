import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserAccessService {

  private userUrl: string;
  private controlUrl: string;

  constructor(private http: HttpClient) { 
    this.userUrl = 'http://localhost:8080/api-techRing/users/';
    this.controlUrl = 'http://localhost:8080/api-techRing/contact/';
  }

  public saveCustomer(username, email, password){
    return this.http.post(this.userUrl+'create/customer', [username, email, password]);
  }

  public saveVendor(email, username, password, street1, street2, city, province, tel, mobile){
    return this.http.post(this.userUrl+'create/vendor', [email, username, password, street1, street2, city, province, tel, mobile]);
  }

  public login(username, password){
    return this.http.post(this.userUrl+'login', [username, password]);
  }

  public addContact(email, message) {
    return this.http.post(this.controlUrl, [email, message]);
  }
}
