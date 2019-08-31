import { Component, OnInit }  from '@angular/core';
import {LaptopBrandService}   from '../service/laptop-brand.service';
import {LaptopService}        from '../service/laptop.service';
import {LaptopStore}          from './laptop.store';
import {LaptopCompareService} from '../service/laptop-compare.service';
import { Point }              from '../model/point'
import {Router}               from "@angular/router";
import {passingObject}        from '../model/passingObject';

import {LaptopInteractionService} from '../service/laptop-interaction.service';
import { Laptop } from '../model/laptop';


@Component({
  selector: 'app-laptop-products',
  templateUrl: './laptop-products.component.html',
  styleUrls: ['./laptop-products.component.css']
})
export class LaptopProductsComponent implements OnInit {

  private lapBrand: Object;
  private laptop: Object;
  private oneLaptop: Object;
  private lapBrandList: [];
  private laptopList: [];
  private defaulsLaptop = "Dell";
  private boxDisplay: boolean = false;
  private enableCompare = false;

  private firstLapId:string;
  private secondLapId:string;
  private firstLapScore:number;
  private secondLapScore:number;

  private point2:Point;
  private point1:Point;

  private x=0;

  resultObject  = new Array();
  

  /**
   * 
   * 
   */
  private comLap1 = new Array();


  list:LaptopStore;
  
  constructor(private laptopBrandService: LaptopBrandService, private laptopService:LaptopService, private laptopCompareService:LaptopCompareService,private router: Router,private laptopInteractionService:LaptopInteractionService) {}

  ngOnInit() {
    this.getLapBrad();
    this.myFunc(this.defaulsLaptop);
    
  }

  /* Get All Laptop Brands From TechRing API */
  getLapBrad(){
      this.laptopBrandService.getAllLapBrand().subscribe(
        data => {
          this.lapBrand = data;
          this.lapBrandList = this.lapBrand["responseObject"]
        }
      )
  }

  /* Find Laptop Brand Wise
     We need pass laptop brand name as parameter 
  */
  myFunc(brand){
       this.laptopService.getAllLaptopBrandWise(brand).subscribe(
         data => {
           this.laptop = data;
           this.laptopList = this.laptop["responseObject"];
         }
       )
  }

  /**
   * 
   * Find Laptop By Id
      We need pass laptop id as parameter
   */
  findLaptopById(id){
    console.log(id);
    this.laptopService.getLaptopById(id).subscribe(
      data => {
          this.oneLaptop = data["responseObject"];
          console.log(this.oneLaptop);
      }
    )
  }

  /**
   * 
   * Add Laptops for comparing list
   */
  addToCompare(laptop1){

    this.boxDisplay = true;

    this.comLap1.push(laptop1);

    // console.log(laptop1[0]);
    // console.log(laptop1[1]);

    if(this.comLap1.length == 2){
      this.enableCompare = true;
    }
  }

  /**
   * find computational power point from ` Python Expert System ` 
   * 
   */
  compare(laptops){

    this.laptopCompareService.getLaptopPoint(laptops[0]).subscribe(data => {

      this.point1 = new Point(data);
      this.firstLapScore = data["point"]
      this.firstLapId = laptops[0].id;

    })

    this.laptopCompareService.getLaptopPoint(laptops[1]).toPromise().then(data => {

      this.point2 = new Point(data);
      this.secondLapScore = data["point"]
      this.secondLapId = laptops[1].id;

      this.showResult();

    })

  }

  /**
   * show comparision result.
   * 
   */
  showResult(){
      this.router.navigate(['/laptop_comparison/'+this.firstLapScore+'/'+this.firstLapId+'/'+this.secondLapScore+'/'+this.secondLapId]);
  }

}
