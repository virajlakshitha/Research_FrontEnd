import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pcpart } from '../model/pcpart';
import { Comments } from '../model/comments';
import { VendorPrice } from '../model/vendor-price';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private pcpartsUrl: string;
  private commentsUrl: string;

  constructor(private http: HttpClient) { 
    this.pcpartsUrl = 'http://localhost:8080/api-techRing/pcparts/';
    this.commentsUrl = 'http://localhost:8080/api-techRing/comments/';
  }

  public findAll(): Observable<Pcpart[]> {
    return this.http.get<Pcpart[]>(this.pcpartsUrl);
  }

  public findByName(category: string, name: string): Observable<Pcpart[]> {
    return this.http.get<Pcpart[]>(this.pcpartsUrl+"by_name/"+category+"/"+name);
  }

  public findById(category: string, _id: string): Observable<Pcpart> {
    return this.http.get<Pcpart>(this.pcpartsUrl+"by_id/"+category+"/"+_id);
  }

  public sortProducts(option: string): Observable<Pcpart[]> {
    return this.http.get<Pcpart[]>(this.pcpartsUrl+'sort_by/'+option);
  }

  public getComments(name: string): Observable<Comments[]> {
    return this.http.get<Comments[]>(this.commentsUrl+'comments/'+name);
  }

  public getVendorPrices(name: string): Observable<VendorPrice[]> {
    return this.http.get<VendorPrice[]>(this.pcpartsUrl+"vendor_prices/"+name);
  }
}
