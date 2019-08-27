import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Pcpart } from '../model/pcpart';
import { PcpartServiceService } from '../service/pcpart-service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";

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
  budget_pro: Object;
  Budget_Pro = [];

  employeeForm: FormGroup;
  settingsForm: FormGroup;
  loading = 'false';
  total_price = 0;

  min;
  max;
  ram_loop = 0;
  vga_loop = 0;
  cpu_loop = 0;
  motherboard_loop = 0;
  hardDisk_loop = 0;
  budget_loop = 0;
                  
  constructor(private pcpartServiceService: PcpartServiceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.employeeForm = new FormGroup({
      min: new FormControl(),
      max: new FormControl()
    });
    this.settingsForm = new FormGroup({
      ram_min: new FormControl(),
      ram_max: new FormControl(),
      vga_min: new FormControl(),
      vga_max: new FormControl(),
      cpu_min: new FormControl(),
      cpu_max: new FormControl(),
      motherboard_min: new FormControl(),
      motherboard_max: new FormControl(),
      hard_disk_min: new FormControl(),
      hard_disk_max: new FormControl()
    });
    this.getMinMaxBudget();
    this.budgetPlan(this.min, this.max);
  }

  onSubmit(): void {
    var min = this.employeeForm.value.min;
    var max = this.employeeForm.value.max;
    this.budgetPlan(min, max);
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
  changePCPart(category) {
    this.loading = 'true';

    
  }

  budgetPlan(min, max) {
    this.pcpartServiceService.budgetPlan(min, max).subscribe(data => {
      if(data["responseCode"] == "111"){
        this.budget_pro = data;
        this.Budget_Pro = data["responseObject"];
        this.Ram = this.Budget_Pro[this.budget_loop]["ram"];
        this.total_price = this.total_price + parseFloat(this.Ram["price"]);
        this.Vga = this.Budget_Pro[this.budget_loop]["vga"];
        this.total_price = this.total_price + parseFloat(this.Vga["price"]);
        this.Cpu = this.Budget_Pro[this.budget_loop]["cpu"];
        this.total_price = this.total_price + parseFloat(this.Cpu["price"]);
        this.Motherboard = this.Budget_Pro[this.budget_loop]["motherboard"];
        this.total_price = this.total_price + parseFloat(this.Motherboard["price"]);
        this.Hard_Disk = this.Budget_Pro[this.budget_loop]["hard_disk"];
        this.total_price = this.total_price + parseFloat(this.Hard_Disk["price"]);
      }
    },
    (error: any) => console.log(error),
    () => console.log('Gets all Data'));
  }

  //Differrent budget plan
  differentPlan() {
    this.loading = 'true';

    this.total_price = 0;
    this.budget_loop++;

        this.Ram = this.Budget_Pro[this.budget_loop]["ram"];
        this.total_price = this.total_price + parseFloat(this.Ram["price"]);
        this.Vga = this.Budget_Pro[this.budget_loop]["vga"];
        this.total_price = this.total_price + parseFloat(this.Vga["price"]);
        this.Cpu = this.Budget_Pro[this.budget_loop]["cpu"];
        this.total_price = this.total_price + parseFloat(this.Cpu["price"]);
        this.Motherboard = this.Budget_Pro[this.budget_loop]["motherboard"];
        this.total_price = this.total_price + parseFloat(this.Motherboard["price"]);
        this.Hard_Disk = this.Budget_Pro[this.budget_loop]["hard_disk"];
        this.total_price = this.total_price + parseFloat(this.Hard_Disk["price"]);

    this.loading = 'false';
  }

  settingsSubmit() {
    this.budget_loop = 0;
    var ram_min = this.settingsForm.value.ram_min;
    var ram_max = this.settingsForm.value.ram_max;
    var vga_min = this.settingsForm.value.vga_min;
    var vga_max = this.settingsForm.value.vga_max;
    var cpu_min = this.settingsForm.value.cpu_min;
    var cpu_max = this.settingsForm.value.cpu_max;
    var motherboard_min = this.settingsForm.value.motherboard_min;
    var motherboard_max = this.settingsForm.value.motherboard_max;
    var hard_disk_min = this.settingsForm.value.hard_disk_min;
    var hard_disk_max = this.settingsForm.value.hard_disk_max;

    this.pcpartServiceService.settingsSubmit(ram_min, ram_max, vga_min, vga_max, cpu_min, cpu_max, motherboard_min, motherboard_max, hard_disk_min, hard_disk_max).subscribe(data => {
      this.Ram = data["responseObject"][this.budget_loop]["ram"];
      this.total_price = this.total_price + this.Ram["price"];
        this.Vga = data["responseObject"][this.budget_loop]["vga"];
        this.total_price = this.total_price + this.Vga["price"];
        this.Cpu = data["responseObject"][this.budget_loop]["cpu"];
        this.total_price = this.total_price + this.Cpu["price"];
        this.Motherboard = data["responseObject"][this.budget_loop]["motherboard"];
        this.total_price = this.total_price + this.Motherboard["price"];
        this.Hard_Disk = data["responseObject"][this.budget_loop]["hard_disk"];
        this.total_price = this.total_price + this.Hard_Disk["price"];
    },
    (error: any) => console.log(error),
    () => console.log('Gets all Data'));
  }

  redirect(category, _id): void {
    this.router.navigate(['/product_details/' + category + '/' + _id]);
  }

  getMinMaxBudget() {
    this.pcpartServiceService.getMaxMinBudget().subscribe(data => {
      if(data["responseCode"] == "111"){
        this.min = data["responseObject"]["min"];
        this.max = data["responseObject"]["max"];
      }
    },
    (error: any) => console.log(error),
    () => console.log('Gets all Data'));
  }
}
