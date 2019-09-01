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
  
  employeeForm: FormGroup;
  settingsForm: FormGroup;
  total_price = 0;
  budget_loop = 1;
  total_loop = 0;
  Budget_Pro = [];

  Ram = [];
  Vga = [];
  Cpu = [];
  Motherboard = [];
  Hard_Disk = [];
  min_ram = 0;
  max_ram = 4500;
  min_vga = 0;
  max_vga = 7500;
  min_cpu = 0;
  max_cpu = 6500;
  min_motherboard = 0;
  max_motherboard = 4500;
  min_hard_disk = 0;
  max_hard_disk = 2500;
                  
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
    this.budgetPlan(this.min_ram, this.max_ram, this.min_motherboard, this.max_motherboard, this.min_vga, this.max_vga, this.min_cpu, this.max_cpu, this.min_hard_disk, this.max_hard_disk);
  }

  redirect(category, _id): void {
    this.router.navigate(['/product_details/' + category + '/' + _id]);
  }

  budgetPlan(ram_min, ram_max, motherboard_min, motherboard_max, vga_min, vga_max, cpu_min, cpu_max,hard_disk_min, hard_disk_max) {
    this.pcpartServiceService.budgetPlan(ram_min, ram_max, motherboard_min, motherboard_max, vga_min, vga_max, cpu_min, cpu_max,hard_disk_min, hard_disk_max).subscribe(data => {
      console.log(data);
      if(data["responseCode"] == "111"){
        this.Budget_Pro = data["responseObject"];
        console.log(this.Budget_Pro);
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
        console.log(this.Motherboard["user_rating"]);
        if(this.Motherboard["price"] != null){
          this.total_price = this.total_price + parseFloat(this.Motherboard["price"]);
        }
        this.Hard_Disk = this.Budget_Pro[this.budget_loop]["hard_disk"];
        if(this.Hard_Disk["price"] != null){
          this.total_price = this.total_price + parseFloat(this.Hard_Disk["price"]);
        }
      }
    },
    (error: any) => console.log(error));
  }

  // settingsSubmit(ram_min, ram_max, motherboard_min, motherboard_max, vga_min, vga_max, cpu_min, cpu_max,hard_disk_min, hard_disk_max) {
  settingsSubmit() {
    this.budget_loop = 1;
    this.total_price = 0;

    var ram_min = this.settingsForm.value.ram_min;
    this.min_ram = ram_min;
    var ram_max = this.settingsForm.value.ram_max;
    this.max_ram = ram_max;
    var vga_min = this.settingsForm.value.vga_min;
    this.min_vga = vga_min;
    var vga_max = this.settingsForm.value.vga_max;
    this.max_vga = vga_max;
    var cpu_min = this.settingsForm.value.cpu_min;
    this.min_cpu = cpu_min;
    var cpu_max = this.settingsForm.value.cpu_max;
    this.max_cpu = cpu_max;
    var motherboard_min = this.settingsForm.value.motherboard_min;
    this.min_motherboard = motherboard_min;
    var motherboard_max = this.settingsForm.value.motherboard_max;
    this.max_motherboard = motherboard_max;
    var hard_disk_min = this.settingsForm.value.hard_disk_min;
    this.min_hard_disk = hard_disk_min;
    var hard_disk_max = this.settingsForm.value.hard_disk_max;
    this.max_hard_disk = hard_disk_max;

    this.pcpartServiceService.settingsSubmit(ram_min, ram_max, motherboard_min, motherboard_max, vga_min, vga_max, cpu_min, cpu_max, hard_disk_min, hard_disk_max).subscribe(data => {
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
    (error: any) => console.log(error));
  }

  differentPlan() {
    if(this.total_loop-1 != this.budget_loop){
      this.total_price = 0;
      this.budget_loop = this.budget_loop+1;
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
  }

  changePCPart(category) {
    var arr = { "motherboard": this.Motherboard["id"], "cpu": this.Cpu["id"], "ram": this.Ram["id"], "vga": this.Vga["id"], "hard_disk": this.Hard_Disk["id"] };
    var pass_min = 0;
    var pass_max = 0;
    if(category == "motherboard"){
      pass_min = this.min_motherboard;
      pass_max = this.max_motherboard;
    }
    else if(category == "cpu"){
      pass_min = this.min_cpu;
      pass_max = this.max_cpu;
    }
    else if(category == "ram"){
      pass_min = this.min_ram;
      pass_max = this.max_ram;
    }
    else if(category == "vga"){
      pass_min = this.min_vga;
      pass_max = this.max_vga;
    }
    else if(category == "hard_disk"){
      pass_min = this.min_hard_disk;
      pass_max = this.max_hard_disk;
    }
    this.pcpartServiceService.changePCPart(category, pass_min , pass_max, arr).subscribe(data => {
      if(data["responseCode"] == "111"){
        console.log(data["responseObject"]);
        if(category == "ram"){
          this.Ram = data["responseObject"][this.budget_loop]["ram"];
          if(this.Ram["price"] != null){
            this.total_price = this.total_price + parseFloat(this.Ram["price"]);
          }
        }
        else if(category == "motherboard")
        
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
      }
      else{
        console.log("error -> change pc");
      }
    },
    (error: any) => console.log(error));
  }

}
