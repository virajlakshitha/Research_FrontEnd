import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pcpart } from '../model/pcpart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PcpartServiceService {

  private pcpartsUrl: string;

  constructor(private http: HttpClient) { 
    this.pcpartsUrl = 'http://localhost:8080/api-techRing/pcparts/';
  }

  public findAll(): Observable<Pcpart[]> {
    return this.http.get<Pcpart[]>(this.pcpartsUrl);
  }

  public save(pcpart: Pcpart) {
    return this.http.post<Pcpart>(this.pcpartsUrl+'add/', pcpart);
  }

  public findByName(name: string): Observable<Pcpart[]> {
    return this.http.get<Pcpart[]>(this.pcpartsUrl+''+name);
  }

  public findByCategory(category: string): Observable<Pcpart[]> {
    return this.http.get<Pcpart[]>(this.pcpartsUrl+'category/'+category);
  }

  public findById(_id: string): Observable<Pcpart> {
    return this.http.get<Pcpart>(this.pcpartsUrl+_id);
  }
}
