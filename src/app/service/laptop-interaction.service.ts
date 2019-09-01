import { Injectable } from '@angular/core';
import {Subject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LaptopInteractionService {

  private laptopInteraction = new Subject<number>();
  compareResult$ = this.laptopInteraction.asObservable();

  constructor() { }

  sendLaptopDetails(data){
    // console.log(JSON.stringify(data));
    this.laptopInteraction.next(data);
  }

}
