import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
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

  ram: Object;
  Ram = [];
  vga: Object;
  Vga = [];
  motherboard: Object;
  Motherboard = [];
  cpu: Object;
  Cpu = [];
  hard_disk: Object;
  Hard_Disk = [];

  employeeForm: FormGroup;

  constructor(private pcpartServiceService: PcpartServiceService) { }

  ngOnInit() {
    this.getMaximumPCParts();
  }

  //Default method gets pc parts which have maximum prices
  getMaximumPCParts() {
    this.pcpartServiceService.findMaximum().subscribe(data => {
      this.ram = data[0];
    },
    (error: any) => console.log(error),
    () => console.log('Gets all data'));

    var txt = '{"name": "Viraj", "price": 2500.00}';
    this.Ram = JSON.parse(txt);
    console.log(this.Ram);

    var txt = '{"name": "Viraj", "price": 2500.00}';
    this.Vga = JSON.parse(txt);
    console.log(this.Vga);

    var txt = '{"name": "Viraj", "price": 2500.00}';
    this.Motherboard = JSON.parse(txt);
    console.log(this.Motherboard);

    var txt = '{"name": "Viraj", "price": 2500.00}';
    this.Cpu = JSON.parse(txt);
    console.log(this.Cpu);

    var txt = '{"name": "Viraj", "price": 2500.00}';
    this.Hard_Disk = JSON.parse(txt);
    console.log(this.Hard_Disk);

  }

  //When price range changes this method will be called
  getPriceRanges() {
    var min = 1200;
    var max = 90000;
    this.pcpartServiceService.findByPriceRange(min, max).subscribe(data => {
      this.ram = data[0];
    },
      (error: any) => console.log(error),
      () => console.log('Gets all data'));
  }

  //When the user clicks replace button to replace an item
  changePCPart(category, id) {
    var min = 1200.00;
    var max = 90000.00;
    this.pcpartServiceService.changePCPart(category, id, min, max).subscribe(data => {
      this.ram = data['RAM'];
    },
      (error: any) => console.log(error),
      () => console.log('Gets all data'));
  }

  //Differrent budget plan
  differentPlan() {
    var min = 1200;
    var max = 90000;
    this.pcpartServiceService.differentPlan(min, max).subscribe(data => {
      this.ram = data[0];
    },
      (error: any) => console.log(error),
      () => console.log('Gets all data'));
  }


}
