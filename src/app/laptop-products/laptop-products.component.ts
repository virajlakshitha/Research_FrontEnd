import { Component, OnInit }  from '@angular/core';
import {LaptopBrandService}   from '../service/laptop-brand.service';
import {LaptopService}        from '../service/laptop.service';
import {LaptopStore}          from './laptop.store';
import {LaptopCompareService} from '../service/laptop-compare.service';
import { Point }              from '../model/point'
import {Router}               from "@angular/router";
import {passingObject}        from '../model/passingObject';

import {LaptopInteractionService} from '../service/laptop-interaction.service';


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

    if(this.comLap1.length == 2){
      this.enableCompare = true;
    }
  }

   private point2:Point = null;
   private point1:Point = null;

   private x=0;

   resultObject  = new Array();

  compare(laptops){

    this.laptopCompareService.getLaptopPoint(laptops[0]).subscribe(data => {
      this.point1 = new Point(data);
      // console.log("First Laptop "+this.point1.Point);
      this.x = this.point1.Point;

      let lap = new passingObject(this.point1.Point,laptops[0]);
      this.resultObject.push(40);

      console.log(this.resultObject);
    })

    this.laptopCompareService.getLaptopPoint(laptops[1]).toPromise().then(data => {
        this.point2 = new Point(data);
        // console.log("Second Laptop "+this.point2.Point);
        let lap = new passingObject(this.point2.Point,laptops[1]);
        this.resultObject.push(20);

        this.print();

        console.log(this.resultObject);
    })

  }

  print(){
    
    if(this.x != null){
      // console.log(this.resultObject)
      this.laptopInteractionService.sendLaptopDetails(this.resultObject);
      this.router.navigate(['/laptop_comparison']);
    }
    
  }

}
