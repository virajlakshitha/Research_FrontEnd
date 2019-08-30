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
    this.pcpartsUrl = 'http://localhost:8080/api-techRing/pcparts';
    this.commentsUrl = 'http://localhost:8080/api-techRing/comments';
  }

  public findAll() {
    return this.http.get(this.pcpartsUrl);
  }

  public findByName(category: string, name: string) {
    return this.http.get(this.pcpartsUrl+'/'+category+"/byName/"+name);
  }

  public findById(category: string, _id: string) {
    return this.http.get(this.pcpartsUrl+'/'+category+"/byId/"+_id);
  }

  public sortProducts(option: string) {
    return this.http.get(this.pcpartsUrl+'/sort_by/'+option);
  }

  public getComments(name: string) {
    return this.http.get(this.commentsUrl+'/comments/'+name);
  }

  public getVendorPrices(name: string) {
    return this.http.get(this.pcpartsUrl+"/vendor_prices/"+name);
  }

  public getVendorDetailsForProducts(pro_name: string, category: string) {
    return this.http.get(this.pcpartsUrl+"/vendors/"+category+'/'+pro_name);
  }
  
  public pushNotification(user_id: string, product: string, price: string) {
    return this.http.post(this.pcpartsUrl+"/notify",[user_id,product,price]);
  }
}
