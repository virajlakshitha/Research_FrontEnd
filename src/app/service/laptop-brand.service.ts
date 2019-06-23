import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LaptopBrandService {

  private lapBrandUrl: string;

  constructor(private http: HttpClient) { 
    this.lapBrandUrl = 'http://localhost:8080/api-techRing';
  }

  public getAllLapBrand(){
    return this.http.get(this.lapBrandUrl+'/lapBrands/getAll');
  }
}
