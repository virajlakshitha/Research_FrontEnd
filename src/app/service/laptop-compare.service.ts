import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Laptop} from '../model/laptop';
import {Point} from '../model/point';

@Injectable({
  providedIn: 'root'
})
export class LaptopCompareService {

  private lapTopCompareUrl: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type':'application/json'
    })
  }

  constructor(private http: HttpClient) { 
    this.lapTopCompareUrl = 'http://localhost:8093/api-py-techRing/Laptop';
  }

  public getLaptopPoint(laptop){
    return this.http.post(this.lapTopCompareUrl , laptop, this.httpOptions)
  }
}
