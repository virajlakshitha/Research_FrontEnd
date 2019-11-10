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
import { NgxSpinnerService } from "ngx-spinner";


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
  private elseisVisible = false;


  list:LaptopStore;
  
  constructor(private laptopBrandService: LaptopBrandService, private laptopService:LaptopService, private laptopCompareService:LaptopCompareService,private router: Router,private laptopInteractionService:LaptopInteractionService, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.getLapBrad();
    this.myFunc(this.defaulsLaptop);
  }

  /* Get All Laptop Brands From TechRing API */
  getLapBrad(){

    let promise = this.laptopBrandService.getAllLapBrand().toPromise();
    promise.then((data) => {

      this.lapBrand = data;
      this.lapBrandList = this.lapBrand["responseObject"]

    }).catch((err) => {
      console.log(err+" Error...........");
    })


    // this.laptopBrandService.getAllLapBrand().subscribe(
    //   data => {
    //     this.lapBrand = data;
    //     this.lapBrandList = this.lapBrand["responseObject"]
    //   }
    // )
  }

  /* Find Laptop Brand Wise
     We need pass laptop brand name as parameter 
  */
  myFunc(brand){

    let promise = this.laptopService.getAllLaptopBrandWise(brand).toPromise();
    promise.then((data) => {
      this.laptop = data;
      this.laptopList = this.laptop["responseObject"];
    }).catch((err) => {

    })


    // this.laptopService.getAllLaptopBrandWise(brand).subscribe(
    //   data => {
    //     this.laptop = data;
    //     this.laptopList = this.laptop["responseObject"];
    //   }123.231.122.161
    // )
  }

  /**
   * 
   * Find Laptop By Id
      We need pass laptop id as parameter
   */
  findLaptopById(id){

    // this.elseisVisible = true;
    // alert(1234);
    // console.log(id);
    // this.spinner.show();
    // setTimeout(() => {
  

    // this.spinner.hide();
    // }, 2000);

    let promise = this.laptopService.getLaptopById(id).toPromise();
    this.spinner.show();
    promise.then((data) => {

      this.oneLaptop = data["responseObject"];
      console.log(this.oneLaptop);
      this.spinner.hide();

    }).catch((err) => {

    })
    
    

    // this.laptopService.getLaptopById(id).subscribe(
    //   data => {
    //       this.oneLaptop = data["responseObject"];
    //       console.log(this.oneLaptop);
    //   }
    // )
  }

  findLaptop(){
   
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

    new Promise((resolve,reject) => {
      this.laptopCompareService.getLaptopPoint(laptops[0]).toPromise()
      .then((data) => {

        this.point1 = new Point(data);
        this.firstLapScore = data["point"]
        this.firstLapId = laptops[0].id;
        resolve();
      })
      .catch((err) => {
          console.log(reject);
      })
    });

    new Promise((resolve,reject) => {
      this.laptopCompareService.getLaptopPoint(laptops[1]).toPromise()
      .then((data) => {

        this.point2 = new Point(data);
        this.secondLapScore = data["point"]
        this.secondLapId = laptops[1].id;
        resolve();
        this.showResult();
      })
      .catch((err) => {
          console.log(reject);
      })
    });

    // let promise1 = this.laptopCompareService.getLaptopPoint(laptops[0]).toPromise();
    // promise1.then((data) => {

    //   this.point1 = new Point(data);
    //   this.firstLapScore = data["point"]
    //   this.firstLapId = laptops[0].id;

    //   console.log(this.firstLapId);

    // }).catch(() => {
    //   console.log("Calling first point enerator");
    // });

    // let promise2 = this.laptopCompareService.getLaptopPoint(laptops[1]).toPromise();
    // promise2.then((data) => {

    //   this.point1 = new Point(data);
    //   this.firstLapScore = data["point"]
    //   this.firstLapId = laptops[0].id;

    //   this.showResult();

    // }).catch(() => {
    //   console.log("Calling second point enerator");
    // });

    // this.laptopCompareService.getLaptopPoint(laptops[0]).subscribe(data => {

    //   this.point1 = new Point(data);
    //   this.firstLapScore = data["point"]
    //   this.firstLapId = laptops[0].id;

    // })

    // this.laptopCompareService.getLaptopPoint(laptops[1]).toPromise().then(data => {

    //   this.point2 = new Point(data);
    //   this.secondLapScore = data["point"]
    //   this.secondLapId = laptops[1].id;

    //   this.showResult();

    // })

    

  }

  /**
   * show comparision result.
   * 
   */
  showResult(){
      this.router.navigate(['/laptop_comparison/'+this.firstLapScore+'/'+this.firstLapId+'/'+this.secondLapScore+'/'+this.secondLapId]);
  }

}
