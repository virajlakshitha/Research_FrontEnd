import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Laptop} from '../model/laptop';

@Injectable({
  providedIn: 'root'
})
export class LaptopCompareService {

  private lapTopCompareUrl: string;
  private laptop1:Laptop;
  private laptop2:Laptop;

  constructor(private http: HttpClient) { 
    this.lapTopCompareUrl = 'http://localhost:8093/api-py-techRing/Laptop';
  }

  public getAllLaptopBrandWise(laptops){
    //return this.http.post();
    
    for(let i=0; i<laptops.length; i++){

      if(i==0){
        this.laptop1 = laptops[i];
        let laptop = new Laptop(this.laptop1);
        this.http.post(this.lapTopCompareUrl , laptop).toPromise().then(data => {
          console.log(data);
        });
        // console.log("Laptop 1 "+this.laptop1.batteryCapacity);
      }
      else if(i==1){
        this.laptop2 = laptops[i];
        console.log("Laptop 1 "+this.laptop2.batteryCapacity);
      }
    }
    // console.log(laptops.length);

    // console.log(laptops);
  }
}
