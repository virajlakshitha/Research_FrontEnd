import { Component, OnInit } from '@angular/core';
import { Pcpart } from '../model/pcpart';
import { PcpartServiceService } from '../service/pcpart-service.service';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-build-for-price',
  templateUrl: './build-for-price.component.html',
  styleUrls: ['./build-for-price.component.css']
})
export class BuildForPriceComponent implements OnInit {
  minValue: number = 50;
  maxValue: number = 200;
  options: Options = {
    floor: 0,
    ceil: 250
  };

  ram: Pcpart[];
  vga: Pcpart[];
  motherboard: Pcpart[];
  cpu: Pcpart[];

  constructor(private pcpartServiceService: PcpartServiceService) { }

  ngOnInit() {
    this.getMaximumPCParts();
  }

  //Default method gets pc parts which have maximum prices
  getMaximumPCParts() {
    // this.pcpartServiceService.findMaximum().subscribe(data => {
    //   this.pcpart = data;
    // },
    // (error: any) => console.log(error),
    // () => console.log('Gets all data'));

    this.ram = [{ id: "0145263", name: "Kingston 4GB RAM", price: "15000.00", category: "RAM", image: "" }];
    this.vga = [{ id: "0145263", name: "Kingston 4GB RAM", price: "15000.00", category: "VGA", image: "" }];
    this.motherboard = [{ id: "0145263", name: "Kingston 4GB RAM", price: "15000.00", category: "VGA", image: "" }];
    this.cpu = [{ id: "0145263", name: "Kingston 4GB RAM", price: "15000.00", category: "VGA", image: "" }];

  }

  //When price range changes this method will be called
  getPriceRanges() {
    var min = 1200;
    var max = 90000;
    this.pcpartServiceService.findByPriceRange(min, max).subscribe(data => {
      this.ram = data;
    },
      (error: any) => console.log(error),
      () => console.log('Gets all data'));
  }

  //When the user clicks replace button to replace an item
  changePCPart(category, id) {
    var min = 1200.00;
    var max = 90000.00;
    this.pcpartServiceService.changePCPart(category, id, min, max).subscribe(data => {
      this.ram = data;
    },
      (error: any) => console.log(error),
      () => console.log('Gets all data'));
  }

  //Differrent budget plan
  differentPlan() {
    var min = 1200;
    var max = 90000;
    this.pcpartServiceService.differentPlan(min, max).subscribe(data => {
      this.ram = data;
    },
      (error: any) => console.log(error),
      () => console.log('Gets all data'));
  }


}
