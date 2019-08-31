import { Component, OnInit } from '@angular/core';
import {LaptopInteractionService} from '../service/laptop-interaction.service';
import { LaptopBrandService } from '../service/laptop-brand.service';

@Component({
  selector: 'app-laptop-comparison',
  templateUrl: './laptop-comparison.component.html',
  styleUrls: ['./laptop-comparison.component.css']
})
export class LaptopComparisonComponent implements OnInit {

  private arrayList = [];

  name = "Nisansala";
  lapBrandList = [1,2,3,4];

  public point1 : number;
  public point2 = 40;

  isDone: boolean = false;

  constructor(private laptopInteractionService:LaptopInteractionService) {

    
  }

  ngOnInit() {

    this.getLapBrad();
  }

  private lapBrand: Object;

  getLapBrad(){  

    this.laptopInteractionService.compareResult$.subscribe( data => {
      
      this.point1 = data[0];

      if(this.point1 > 10){
          alert("!@#");
      }

    })
}

}
