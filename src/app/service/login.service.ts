import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userUrl: string;

  constructor(private http: HttpClient) { 
    this.userUrl = 'http://localhost:8080/api-techRing/pcparts/';
  }

  public findAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  public findByUserId(_id: string): Observable<User> {
    return this.http.get<User>(this.userUrl+_id);
  }

  public findByUser(username: string, password) {
    return this.http.get(this.userUrl+username+'/'+password);
  }
}
