import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pcpart } from '../model/pcpart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PcpartServiceService {

  private pcpartsUrl: string;
  private gamesUrl: string;

  constructor(private http: HttpClient) { 
    this.pcpartsUrl = 'http://localhost:8080/api-techRing/pcparts/';
    // this.gamesUrl = 'http://localhost:8080/api-techRing/games';
  }

  public findMaximum(): Observable<Pcpart[]> {
    let headers = new HttpHeaders().set('Authorization', 'auth-token');

    return this.http.get<Pcpart[]>(this.pcpartsUrl, {headers});
    // return this.http.get<Pcpart[]>(this.pcpartsUrl);
  }

  public findById(_id: string): Observable<Pcpart> {
    return this.http.get<Pcpart>(this.pcpartsUrl+_id);
  }

  public findByPriceRange(min, max): Observable<Pcpart[]> {
    return this.http.get<Pcpart[]>(this.pcpartsUrl+'build_for_price/'+min+'/'+max);
  }

  public changePCPart(category, id, min, max) {
    return this.http.get<Pcpart[]>(this.pcpartsUrl+'change/'+category+'/'+id+'/'+min+'/'+max);
  }

  public differentPlan(min, max) {
    return this.http.get<Pcpart[]>(this.pcpartsUrl+'different_plan/'+'/'+min+'/'+max);
  }

  public getAllGames(): Observable<Pcpart[]> {
    return this.http.get<Pcpart[]>(this.pcpartsUrl+'/getAll');
  }
}
