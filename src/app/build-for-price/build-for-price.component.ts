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
    this.employeeForm = new FormGroup({
      min: new FormControl(),
      max: new FormControl()
    });
    this.getMaximumPCParts(0, 200000);
  }

  onSubmit(): void {
    var min = this.employeeForm.value.min;
    var max = this.employeeForm.value.max;
    this.getMaximumPCParts(min, max);
  }

  //Default method gets pc parts which have maximum prices
  getMaximumPCParts(min, max) {
    this.pcpartServiceService.changePCPart('ram', '00', min, max).subscribe(data => {
      this.ram = data;
      this.Ram = this.ram["responseObject"][0];
    },
    (error: any) => console.log(error),
    () => console.log('Gets all data'));

    this.pcpartServiceService.changePCPart('vga', '00', min, max).subscribe(data => {
      this.vga = data;
      this.Vga = this.vga["responseObject"][0];
    },
    (error: any) => console.log(error),
    () => console.log('Gets all data'));

    this.pcpartServiceService.changePCPart('cpu', '00', min, max).subscribe(data => {
      this.cpu = data;
      this.Cpu = this.cpu["responseObject"][0];
    },
    (error: any) => console.log(error),
    () => console.log('Gets all data'));

    this.pcpartServiceService.changePCPart('motherboard', '00', min, max).subscribe(data => {
      this.motherboard = data[0];
      this.Motherboard = this.motherboard["responseObject"][0];
    },
    (error: any) => console.log(error),
    () => console.log('Gets all data'));

    this.pcpartServiceService.changePCPart('hard_disk', '00', min, max).subscribe(data => {
      this.hard_disk = data[0];
      this.Hard_Disk = this.hard_disk["responseObject"][0];
    },
    (error: any) => console.log(error),
    () => console.log('Gets all data'));

    var txt = '{"name": "4GB Kingston RAM", "price": 10500.00}';
    this.Ram = JSON.parse(txt);
    console.log(this.Ram);

    var txt = '{"name": "MSI N740-1GD5 VGA", "price": 25000.00}';
    this.Vga = JSON.parse(txt);
    console.log(this.Vga);

    var txt = '{"name": "Asus H110M-C Motherboard", "price": 12500.00}';
    this.Motherboard = JSON.parse(txt);
    console.log(this.Motherboard);

    var txt = '{"name": "CPU", "price": 12500.00}';
    this.Cpu = JSON.parse(txt);
    console.log(this.Cpu);

    var txt = '{"name": "External HDD", "price": 7500.00}';
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
