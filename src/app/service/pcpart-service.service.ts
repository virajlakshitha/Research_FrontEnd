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
    this.pcpartsUrl = 'http://localhost:8080/api-techRing/build-for-price/';
  }

  public findMaximum(): Observable<Pcpart[]> {
    return this.http.get<Pcpart[]>(this.pcpartsUrl);
  }

  // public findById(_id: string): Observable<Pcpart> {
  //   return this.http.get<Pcpart>(this.pcpartsUrl+_id);
  // }

  public findByPriceRange(min, max): Observable<Pcpart[]> {
    return this.http.get<Pcpart[]>(this.pcpartsUrl+'range/'+min+'/'+max);
  }

  public changePCPart(category, id, min, max) {
    return this.http.get<Pcpart[]>(this.pcpartsUrl+'change/'+category+'/'+id+'/'+min+'/'+max);
  }

  public differentPlan(min, max) {
    return this.http.get<Pcpart[]>(this.pcpartsUrl+'different-plan/'+'/'+min+'/'+max);
  }
}
