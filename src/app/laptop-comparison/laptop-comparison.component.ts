import { Component, OnInit } from '@angular/core';
import {LaptopInteractionService} from '../service/laptop-interaction.service';
import { LaptopBrandService } from '../service/laptop-brand.service';
import { LaptopService } from '../service/laptop.service';
import { Laptop } from '../model/laptop';
import {Router} from '@angular/router'
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-laptop-comparison',
  templateUrl: './laptop-comparison.component.html',
  styleUrls: ['./laptop-comparison.component.css']
})
export class LaptopComparisonComponent implements OnInit {
  private arrayList = [];

  lapBrandList = [1,2,3,4];

  public point1 = 0;
  public point2 = 0;

  isDone: boolean = false;
  private oneLaptop: Object;
  private twoLaptop: Object;

  private firstId:string;
  private firstScore:number;
  private secondtId:string;
  private secondScore:number;

  private laptopRecommentMes:string;

  constructor(private laptopInteractionService:LaptopInteractionService,private laptopService:LaptopService,private router:Router,private activatedRoute:ActivatedRoute) {

  }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {

      this.firstId = params["firstId"]
      this.firstScore = params["firstPoint"]
      this.secondtId = params["secondId"]
      this.secondScore = params["secondPoint"]

      console.log("Lap one point "+this.firstScore+" , "+ "Laptwo point "+this.secondScore);

      this.laptopRecommendation();

    })

    // this.laptopInteractionService.compareResult$.subscribe( data => {
    //   console.log("****"+data[0]);
    //   this.firstId = data[0];
    // });

    this.findLaptopOneById(this.firstId);
    this.findLaptopTwoById(this.secondtId);
  }

  findLaptopOneById(lapId){
    
    this.laptopService.getLaptopById(lapId).subscribe(
      data => {
          this.oneLaptop = data["responseObject"];
          console.log(this.oneLaptop);
      }
    )
  }

  findLaptopTwoById(lapId){
    
    this.laptopService.getLaptopById(lapId).subscribe(
      data => {
          this.twoLaptop = data["responseObject"];
          console.log(this.twoLaptop);
      }
    )
  }

  laptopRecommendation(){

    if(this.firstScore != null && this.secondScore != null){
      console.log("--------------------------------------------")
      if(this.firstScore > this.secondScore){
          
      }
    }
  }

}
