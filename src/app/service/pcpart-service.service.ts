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
  private buildForPriceUrl: string;

  constructor(private http: HttpClient) { 
    this.pcpartsUrl = 'http://localhost:8080/api-techRing/pcparts/';
    this.buildForPriceUrl = 'http://localhost:8080/api-techRing/build_for_price/';
  }

  public findMaximum() {

    return this.http.get(this.pcpartsUrl);
  }

  public findById(_id: string): Observable<Pcpart> {
    return this.http.get<Pcpart>(this.pcpartsUrl+_id);
  }

  public findByPriceRange(min, max) {
    return this.http.get(this.buildForPriceUrl+min+'/'+max);
  }

  public changePCPart(category, min, max) {
    return this.http.get(this.buildForPriceUrl+'change/'+category+'/'+min+'/'+max);
  }

  public differentPlan(min, max) {
    return this.http.get(this.buildForPriceUrl+'different_plan/'+min+'/'+max);
  }
}
