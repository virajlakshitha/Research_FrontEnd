import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pcpart } from '../model/pcpart';
import { User } from '../model/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  private pcpartsUrl: string;
  private userUrl: string;

  constructor(private http: HttpClient) { 
    this.pcpartsUrl = 'http://localhost:8080/api-techRing/pcparts/';
    this.userUrl = 'http://localhost:8080/api-techRing/users/';
  }

  //----------------PC Parts------------------------------------
  public findAllParts(): Observable<Pcpart[]> {
    return this.http.get<Pcpart[]>(this.pcpartsUrl);
  }

  public saveParts(pcpart: Pcpart) {
    return this.http.post<Pcpart>(this.pcpartsUrl+'add/', pcpart);
  }

  public findByPartName(name: string): Observable<Pcpart[]> {
    return this.http.get<Pcpart[]>(this.pcpartsUrl+''+name);
  }

  public findByVendor(vendor: string): Observable<Pcpart[]> {
    return this.http.get<Pcpart[]>(this.pcpartsUrl+'vendor/'+vendor);
  }

  public findByPartId(_id: string): Observable<Pcpart> {
    return this.http.get<Pcpart>(this.pcpartsUrl+_id);
  }

  public updateProduct(_id: string, pcpart: Pcpart) {
    return this.http.put<Pcpart>(this.pcpartsUrl+_id, pcpart);
  }

  public deleteProduct(_id: string) {
    return this.http.delete(this.pcpartsUrl+_id);
  }
  //-----------------------------------------------------------

  //---------------Users---------------------------------------
  public findAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  public saveUsers(user: User) {
    return this.http.post<User>(this.userUrl+'add/', user);
  }

  public findByUserId(_id: string): Observable<User> {
    return this.http.get<User>(this.userUrl+_id);
  }

  public findByUserUsername(username: string): Observable<User> {
    return this.http.get<User>(this.userUrl+username);
  }

  public updateUser(_id: string, user: User) {
    return this.http.put<User>(this.userUrl+_id, user);
  }

  public deleteUser(_id: string) {
    return this.http.delete(this.userUrl+_id);
  }
  //-----------------------------------------------------------

}
