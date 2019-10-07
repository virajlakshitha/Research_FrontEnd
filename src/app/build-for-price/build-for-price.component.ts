import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Model } from './model';
import { PcpartServiceService } from '../service/pcpart-service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-build-for-price',
  templateUrl: './build-for-price.component.html',
  styleUrls: ['./build-for-price.component.css']
})
export class BuildForPriceComponent implements OnInit {

  private model: Model;

  constructor(private pcpartServiceService: PcpartServiceService, private route: ActivatedRoute, private router: Router) {
    this.model = new Model();
  }

  ngOnInit() {
    this.model.priceForm = new FormGroup({
      min: new FormControl(),
      max: new FormControl()
    });
    this.model.settingsForm = new FormGroup({
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

    this.budgetPlan(0,0,0,0,0,0,0,0,0,0);
  }

  sliderForm: FormGroup = new FormGroup({
    sliderControl: new FormControl([20, 80])
  });

  options: Options = {
    floor: 0,
    ceil: 100,
    step: 5
  };

  redirect(category, _id): void {
    this.router.navigate(['/product_details/' + category + '/' + _id]);
  }

  budgetPlan(ram_min, ram_max, motherboard_min, motherboard_max, vga_min, vga_max, cpu_min, cpu_max, hard_disk_min, hard_disk_max) {
    console.log("Im here");
    this.pcpartServiceService.budgetPlan(ram_min, ram_max, motherboard_min, motherboard_max, vga_min, vga_max, cpu_min, cpu_max, hard_disk_min, hard_disk_max).subscribe(data => {
        console.log(data);
        this.model.Budget_Pro = data["res"];
        this.model.total_loop = data["res"].length;

        this.model.Ram = this.model.Budget_Pro[this.model.budget_loop]["ram"];
        if (this.model.Ram["price"] != null) {
          this.model.total_price = this.model.total_price + parseFloat(this.model.Ram["price"]);
        }
        this.model.Vga = this.model.Budget_Pro[this.model.budget_loop]["vga"];
        if (this.model.Vga["price"] != null) {
          this.model.total_price = this.model.total_price + parseFloat(this.model.Vga["price"]);
        }
        this.model.Cpu = this.model.Budget_Pro[this.model.budget_loop]["cpu"];
        if (this.model.Cpu["price"] != null) {
          this.model.total_price = this.model.total_price + parseFloat(this.model.Cpu["price"]);
        }
        this.model.Motherboard = this.model.Budget_Pro[this.model.budget_loop]["motherboard"];
        if (this.model.Motherboard["price"] != null) {
          this.model.total_price = this.model.total_price + parseFloat(this.model.Motherboard["price"]);
        }
        this.model.Hard_Disk = this.model.Budget_Pro[this.model.budget_loop]["hard_disk"];
        if (this.model.Hard_Disk["price"] != null) {
          this.model.total_price = this.model.total_price + parseFloat(this.model.Hard_Disk["price"]);
        }
        
    },
      (error: any) => console.log(error));
  }

  settingsSubmit() {
    this.model.total_price = 0;

    this.model.min_ram = this.model.settingsForm.value.ram_min;
    this.model.max_ram = this.model.settingsForm.value.max_ram;
    this.model.min_vga = this.model.settingsForm.value.vga_min;
    this.model.max_vga = this.model.settingsForm.value.vga_max;
    this.model.min_cpu = this.model.settingsForm.value.cpu_min;
    this.model.max_cpu = this.model.settingsForm.value.cpu_max;
    this.model.min_motherboard = this.model.settingsForm.value.motherboard_min;
    this.model.max_motherboard = this.model.settingsForm.value.motherboard_max;
    this.model.min_hard_disk = this.model.settingsForm.value.hard_disk_min;
    this.model.max_hard_disk = this.model.settingsForm.value.hard_disk_max;

    this.pcpartServiceService.settingsSubmit(this.model.min_ram, this.model.max_ram, this.model.min_vga, this.model.max_vga, this.model.min_cpu, this.model.max_cpu, this.model.min_motherboard, this.model.max_motherboard, this.model.min_hard_disk, this.model.max_hard_disk).subscribe(data => {
     
        this.model.Budget_Pro = data["res"];
        this.model.total_loop = data["res"].length;

        this.model.Ram = data["res"][this.model.budget_loop]["ram"];
        if (this.model.Ram["price"] != null) {
          this.model.total_price = this.model.total_price + parseFloat(this.model.Ram["price"]);
        }
        this.model.Vga = data["res"][this.model.budget_loop]["vga"];
        if (this.model.Vga["price"] != null) {
          this.model.total_price = this.model.total_price + parseFloat(this.model.Vga["price"]);
        }
        this.model.Vga = data["res"][this.model.budget_loop]["vga"];
        if (this.model.Vga["price"] != null) {
          this.model.total_price = this.model.total_price + parseFloat(this.model.Vga["price"]);
        }
        this.model.Cpu = data["res"][this.model.budget_loop]["cpu"];
        if (this.model.Cpu["price"] != null) {
          this.model.total_price = this.model.total_price + parseFloat(this.model.Cpu["price"]);
        }
        this.model.Motherboard = data["res"][this.model.budget_loop]["motherboard"];
        if (this.model.Motherboard["price"] != null) {
          this.model.total_price = this.model.total_price + parseFloat(this.model.Motherboard["price"]);
        }
        this.model.Hard_Disk = data["res"][this.model.budget_loop]["hard_disk"];
        if (this.model.Hard_Disk["price"] != null) {
          this.model.total_price = this.model.total_price + parseFloat(this.model.Hard_Disk["price"]);
        }
      
    },
      (error: any) => console.log(error));
  }

  differentPlan() {
    if (this.model.total_loop - 1 != this.model.budget_loop) {
      this.model.total_price = 0;
      this.model.budget_loop = this.model.budget_loop + 1;

      this.model.Ram = this.model.Budget_Pro[this.model.budget_loop]["ram"];
      if (this.model.Ram["price"] != null) {
        this.model.total_price = this.model.total_price + parseFloat(this.model.Ram["price"]);
      }
      this.model.Vga = this.model.Budget_Pro[this.model.budget_loop]["vga"];
      if (this.model.Vga["price"] != null) {
        this.model.total_price = this.model.total_price + parseFloat(this.model.Vga["price"]);
      }
      this.model.Cpu = this.model.Budget_Pro[this.model.budget_loop]["cpu"];
      if (this.model.Cpu["price"] != null) {
        this.model.total_price = this.model.total_price + parseFloat(this.model.Cpu["price"]);
      }
      this.model.Motherboard = this.model.Budget_Pro[this.model.budget_loop]["motherboard"];
      if (this.model.Motherboard["price"] != null) {
        this.model.total_price = this.model.total_price + parseFloat(this.model.Motherboard["price"]);
      }
      this.model.Hard_Disk = this.model.Budget_Pro[this.model.budget_loop]["hard_disk"];
      if (this.model.Hard_Disk["price"] != null) {
        this.model.total_price = this.model.total_price + parseFloat(this.model.Hard_Disk["price"]);
      }
    }
    else {
      console.log("No More Budget Plans");
    }
  }

  changePCPart(category) {
    var arr = { "motherboard": this.model.Motherboard["id"], "cpu": this.model.Cpu["id"], "ram": this.model.Ram["id"], "vga": this.model.Vga["id"], "hard_disk": this.model.Hard_Disk["id"] };
    var pass_min = 0;
    var pass_max = 0;
    if (category == "motherboard") {
      pass_min = this.model.min_motherboard;
      pass_max = this.model.max_motherboard;
    }
    else if (category == "cpu") {
      pass_min = this.model.min_cpu;
      pass_max = this.model.max_cpu;
    }
    else if (category == "ram") {
      pass_min = this.model.min_ram;
      pass_max = this.model.max_ram;
    }
    else if (category == "vga") {
      pass_min = this.model.min_vga;
      pass_max = this.model.max_vga;
    }
    else if (category == "hard_disk") {
      pass_min = this.model.min_hard_disk;
      pass_max = this.model.max_hard_disk;
    }
    this.pcpartServiceService.changePCPart(category, pass_min, pass_max, arr).subscribe(data => {
      
        if (category == "ram") {
          this.model.Ram = data["res"][this.model.budget_loop]["ram"];
          if (this.model.Ram["price"] != null) {
            this.model.total_price = this.model.total_price + parseFloat(this.model.Ram["price"]);
          }
        }
        else if (category == "vga") {
          this.model.Vga = data["res"][this.model.budget_loop]["vga"];
          if (this.model.Vga["price"] != null) {
            this.model.total_price = this.model.total_price + parseFloat(this.model.Vga["price"]);
          }
        }
        else if (category == "cpu") {
          this.model.Cpu = data["res"][this.model.budget_loop]["cpu"];
          if (this.model.Cpu["price"] != null) {
            this.model.total_price = this.model.total_price + parseFloat(this.model.Cpu["price"]);
          }
        }
        else if (category == "motherboard") {
          this.model.Motherboard = data["res"][this.model.budget_loop]["motherboard"];
          if (this.model.Motherboard["price"] != null) {
            this.model.total_price = this.model.total_price + parseFloat(this.model.Motherboard["price"]);
          }
        }
        else if (category == "hard_disk") {
          this.model.Hard_Disk = data["res"][this.model.budget_loop]["hard_disk"];
          if (this.model.Hard_Disk["price"] != null) {
            this.model.total_price = this.model.total_price + parseFloat(this.model.Hard_Disk["price"]);
          }
        }
      
    },
      (error: any) => console.log(error));
  }

}
