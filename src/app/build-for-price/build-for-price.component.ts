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
  min_val;
  max_val;
  ram_loop = 0;
  vga_loop = 0;
  cpu_loop = 0;
  motherboard_loop = 0;
  hardDisk_loop = 0;
  budget_loop = 0;
  total_loop = 0;
  arr = {};

  a;b;c;d;e;
                  
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

    this.pcpartServiceService.getMaxMinBudget().subscribe(data => {
      if(data["responseCode"] == "111"){
        this.min_val = data["responseObject"]["min"];
        this.max_val = data["responseObject"]["max"];
      }
    },
    (error: any) => console.log(error),
    () => console.log('Gets all Data'));
    // this.changePCPart('ram');
    this.budgetPlan(0, 0);
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
    this.arr = { "motherboard": this.Motherboard["id"], "cpu": this.Cpu["id"], "ram": this.Ram["id"], "vga": this.Vga["id"], "hard_disk": this.Hard_Disk["id"] };
    
    this.pcpartServiceService.changePCPart(category, this.arr).subscribe(data => {
      if(data["responseCode"] == "111"){
        if(category == "ram"){
          this.Ram = data["responseObject"];
        }
        else if(category == "vga"){
          this.Vga = data["responseObject"];
        }
        else if(category == "cpu"){
          this.Cpu = data["responseObject"];
          this.a = this.Cpu["id"];
        }
        else if(category == "motherboard"){
          this.Motherboard = data["responseObject"];
        }
        else if(category == "hard_disk"){
          this.Hard_Disk = data["responseObject"];
        }
        console.log(data["responseObject"]);
      }
      else{
        console.log("error -> Change PC Part");
      }
    },
    (error: any) => console.log(error)); 

    this.loading = 'false';
  }

  budgetPlan(min, max) {
    console.log(this.max_val);
    this.pcpartServiceService.budgetPlan(min, max).subscribe(data => {
      if(data["responseCode"] == "111"){
        this.budget_pro = data;
        this.Budget_Pro = data["responseObject"];
        this.total_loop = data["responseObject"].length;
        this.Ram = this.Budget_Pro[this.budget_loop]["ram"];
        if(this.Ram["price"] != null){
          this.total_price = this.total_price + parseFloat(this.Ram["price"]);
        }
        this.Vga = this.Budget_Pro[this.budget_loop]["vga"];
        if(this.Vga["price"] != null){
          this.total_price = this.total_price + parseFloat(this.Vga["price"]);
        }
        this.Cpu = this.Budget_Pro[this.budget_loop]["cpu"];
        if(this.Cpu["price"] != null){
          this.total_price = this.total_price + parseFloat(this.Cpu["price"]);
        }
        this.Motherboard = this.Budget_Pro[this.budget_loop]["motherboard"];
        if(this.Motherboard["price"] != null){
          this.total_price = this.total_price + parseFloat(this.Motherboard["price"]);
        }
        this.Hard_Disk = this.Budget_Pro[this.budget_loop]["hard_disk"];
        if(this.Hard_Disk["price"] != null){
          this.total_price = this.total_price + parseFloat(this.Hard_Disk["price"]);
        }
        
      }
      else{
        console.log("error -> budget plan");
      }
    },
    (error: any) => console.log(error),
    () => console.log('Gets all Data'));
  }

  //Differrent budget plan
  differentPlan() {
    // this.loading = 'true';

    if(this.total_loop-1 != this.budget_loop){
        this.total_price = 0;
        this.budget_loop++;
        console.log(this.budget_loop);
        this.Ram = this.Budget_Pro[this.budget_loop]["ram"];
        if(this.Ram["price"] != null){
          this.total_price = this.total_price + parseFloat(this.Ram["price"]);
        }
        this.Vga = this.Budget_Pro[this.budget_loop]["vga"];
        if(this.Vga["price"] != null){
          this.total_price = this.total_price + parseFloat(this.Vga["price"]);
        }
        this.Cpu = this.Budget_Pro[this.budget_loop]["cpu"];
        if(this.Cpu["price"] != null){
          this.total_price = this.total_price + parseFloat(this.Cpu["price"]);
        }
        this.Motherboard = this.Budget_Pro[this.budget_loop]["motherboard"];
        if(this.Motherboard["price"] != null){
          this.total_price = this.total_price + parseFloat(this.Motherboard["price"]);
        }
        this.Hard_Disk = this.Budget_Pro[this.budget_loop]["hard_disk"];
        if(this.Hard_Disk["price"] != null){
          this.total_price = this.total_price + parseFloat(this.Hard_Disk["price"]);
        }
      }
      else{
        alert("No more budget plans available");
      }
    // this.loading = 'false';
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
        if(this.Ram["price"] != null){
          this.total_price = this.total_price + parseFloat(this.Ram["price"]);
        }
        this.Vga = data["responseObject"][this.budget_loop]["vga"];
        if(this.Vga["price"] != null){
          this.total_price = this.total_price + parseFloat(this.Vga["price"]);
        }
        this.Cpu = data["responseObject"][this.budget_loop]["cpu"];
        if(this.Cpu["price"] != null){
          this.total_price = this.total_price + parseFloat(this.Cpu["price"]);
        }
        this.Motherboard = data["responseObject"][this.budget_loop]["motherboard"];
        if(this.Motherboard["price"] != null){
          this.total_price = this.total_price + parseFloat(this.Motherboard["price"]);
        }
        this.Hard_Disk = data["responseObject"][this.budget_loop]["hard_disk"];
        if(this.Hard_Disk["price"] != null){
          this.total_price = this.total_price + parseFloat(this.Hard_Disk["price"]);
        }
    },
    (error: any) => console.log(error),
    () => console.log('Gets all Data'));
  }

  redirect(category, _id): void {
    this.router.navigate(['/product_details/' + category + '/' + _id]);
  }

}
