import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LaptopService {

  private lapTopUrl: string;

  constructor(private http: HttpClient) {
    this.lapTopUrl = 'http://localhost:8080/api-techRing/laptops/';
   }

  public getAllLaptopBrandWise(brand:string){
    return this.http.get(this.lapTopUrl+brand+"/search");
  }

  public getLaptopById(lapId:string){
    return this.http.get(this.lapTopUrl+"findById/"+lapId);
  }
}
