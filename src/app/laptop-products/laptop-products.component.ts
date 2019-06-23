import { Component, OnInit }  from '@angular/core';
import {LaptopBrandService}   from '../service/laptop-brand.service';
import {LaptopService}        from '../service/laptop.service';


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
  
  constructor(private laptopBrandService: LaptopBrandService, private laptopService:LaptopService) {}

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
}
