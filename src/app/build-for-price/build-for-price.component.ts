import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Model } from './model';
import { PcpartServiceService } from '../service/pcpart-service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { Options } from 'ng5-slider';
import * as swal from 'sweetalert2';

@Component({
  selector: 'app-build-for-price',
  templateUrl: './build-for-price.component.html',
  styleUrls: ['./build-for-price.component.css']
})
export class BuildForPriceComponent implements OnInit {

  private model: Model;
  private Swal;

  constructor(private pcpartServiceService: PcpartServiceService, private route: ActivatedRoute, private router: Router) {
    this.model = new Model();
    this.Swal = require('sweetalert2');
  }

  sliderForm: FormGroup;

  ngOnInit() {
    this.sliderForm = new FormGroup({
      sliderControl: new FormControl([0, 100000])
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
    console.log("ng - "+this.sliderForm.value.sliderControl[0]+" "+this.sliderForm.value.sliderControl[1])
    this.budgetPlan(this.sliderForm.value.sliderControl[0], this.sliderForm.value.sliderControl[1]);
    this.model.ramVisible = false;
    this.model.vgaVisible = false;
    this.model.cpuVisible = false;
    this.model.motherboardVisible = false;
    this.model.hard_diskVisible = false;
  }

  options: Options = {
    floor: 0,
    ceil: 100000,
    step: 1
  };

  redirect(category, _id): void {
    this.router.navigate(['/product_details/' + category + '/' + _id]);
  }

  budgetPlan(min, max) {
    var ram_min = min*(16.08/100);
    var ram_max = max*(16.08/100);
    var motherboard_min = min*(14.11/100);
    var motherboard_max = max*(14.11/100);
    var vga_min = min*(34.25/100);
    var vga_max = max*(34.25/100);
    var cpu_min = min*(25.41/100);
    var cpu_max = max*(25.41/100);
    var hard_disk_min = min*(10.14/100);
    var hard_disk_max = max*(10.14/100);
    this.model.ramVisible = false;
    this.model.vgaVisible = false;
    this.model.cpuVisible = false;
    this.model.motherboardVisible = false;
    this.model.hard_diskVisible = false;
    this.pcpartServiceService.budgetPlan(ram_min, ram_max, motherboard_min, motherboard_max, vga_min, vga_max, cpu_min, cpu_max, hard_disk_min, hard_disk_max).subscribe(data => {
        console.log(data["res"].length);
        this.model.Budget_Pro = data["res"];
        this.model.total_loop = data["res"].length;

        this.model.Ram = this.model.Budget_Pro[this.model.budget_loop]["ram"];
        if (this.model.Ram["price"] != null) {
          this.model.total_price = this.model.total_price + parseFloat(this.model.Ram["price"]);
        }
        this.model.ramVisible = true;
        this.model.Vga = this.model.Budget_Pro[this.model.budget_loop]["vga"];
        if (this.model.Vga["price"] != null) {
          this.model.total_price = this.model.total_price + parseFloat(this.model.Vga["price"]);
        }
        this.model.vgaVisible = true;
        this.model.Cpu = this.model.Budget_Pro[this.model.budget_loop]["cpu"];
        if (this.model.Cpu["price"] != null) {
          this.model.total_price = this.model.total_price + parseFloat(this.model.Cpu["price"]);
        }
        this.model.cpuVisible = true;
        this.model.Motherboard = this.model.Budget_Pro[this.model.budget_loop]["motherboard"];
        if (this.model.Motherboard["price"] != null) {
          this.model.total_price = this.model.total_price + parseFloat(this.model.Motherboard["price"]);
        }
        this.model.motherboardVisible = true;
        this.model.Hard_Disk = this.model.Budget_Pro[this.model.budget_loop]["hard_disk"];
        if (this.model.Hard_Disk["price"] != null) {
          this.model.total_price = this.model.total_price + parseFloat(this.model.Hard_Disk["price"]);
        }
        this.model.hard_diskVisible = true;
    },
      (error: any) => console.log(error));
  }

  settingsSubmit() {
    this.model.total_price = 0;
    this.model.ramVisible = false;
    this.model.vgaVisible = false;
    this.model.cpuVisible = false;
    this.model.motherboardVisible = false;
    this.model.hard_diskVisible = false;
    this.model.min_ram = this.model.settingsForm.value.ram_min;
    this.model.max_ram = this.model.settingsForm.value.ram_max;
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
        this.model.ramVisible = true;
        this.model.Vga = data["res"][this.model.budget_loop]["vga"];
        if (this.model.Vga["price"] != null) {
          this.model.total_price = this.model.total_price + parseFloat(this.model.Vga["price"]);
        }
        this.model.vgaVisible = true;
        this.model.Cpu = data["res"][this.model.budget_loop]["cpu"];
        if (this.model.Cpu["price"] != null) {
          this.model.total_price = this.model.total_price + parseFloat(this.model.Cpu["price"]);
        }
        this.model.cpuVisible = true;
        this.model.Motherboard = data["res"][this.model.budget_loop]["motherboard"];
        if (this.model.Motherboard["price"] != null) {
          this.model.total_price = this.model.total_price + parseFloat(this.model.Motherboard["price"]);
        }
        this.model.motherboardVisible = true;
        this.model.Hard_Disk = data["res"][this.model.budget_loop]["hard_disk"];
        if (this.model.Hard_Disk["price"] != null) {
          this.model.total_price = this.model.total_price + parseFloat(this.model.Hard_Disk["price"]);
        }
        this.model.hard_diskVisible = true;
    },
      (error: any) => console.log(error));
  }

  differentPlan() {
    this.model.ramVisible = false;
    this.model.vgaVisible = false;
    this.model.cpuVisible = false;
    this.model.motherboardVisible = false;
    this.model.hard_diskVisible = false;
    if (this.model.total_loop - 1 != this.model.budget_loop) {
      this.model.total_price = 0;
      this.model.budget_loop = this.model.budget_loop + 1;

      this.model.Ram = this.model.Budget_Pro[this.model.budget_loop]["ram"];
      if (this.model.Ram["price"] != null) {
        this.model.total_price = this.model.total_price + parseFloat(this.model.Ram["price"]);
      }
      this.model.ramVisible = true;
      this.model.Vga = this.model.Budget_Pro[this.model.budget_loop]["vga"];
      if (this.model.Vga["price"] != null) {
        this.model.total_price = this.model.total_price + parseFloat(this.model.Vga["price"]);
      }
      this.model.vgaVisible = true;
      this.model.Cpu = this.model.Budget_Pro[this.model.budget_loop]["cpu"];
      if (this.model.Cpu["price"] != null) {
        this.model.total_price = this.model.total_price + parseFloat(this.model.Cpu["price"]);
      }
      this.model.cpuVisible = true;
      this.model.Motherboard = this.model.Budget_Pro[this.model.budget_loop]["motherboard"];
      if (this.model.Motherboard["price"] != null) {
        this.model.total_price = this.model.total_price + parseFloat(this.model.Motherboard["price"]);
      }
      this.model.motherboardVisible = true;
      this.model.Hard_Disk = this.model.Budget_Pro[this.model.budget_loop]["hard_disk"];
      if (this.model.Hard_Disk["price"] != null) {
        this.model.total_price = this.model.total_price + parseFloat(this.model.Hard_Disk["price"]);
      }
      this.model.hard_diskVisible = true;
    }
    else {
      this.Swal.fire('Oops...', 'No More Budget Plans !!!', 'error')
    }
  }

  changePCPart(category) {
    var arr = { "motherboard": this.model.Motherboard["_id"]["$oid"], "cpu": this.model.Cpu["_id"]["$oid"], "ram": this.model.Ram["_id"]["$oid"], "vga": this.model.Vga["_id"]["$oid"], "hard_disk": this.model.Hard_Disk["_id"]["$oid"]};
    var pass_min = 0;
    var pass_max = 0;
    if (category == "motherboard") {
      this.model.motherboardVisible = false;
      pass_min = this.model.min_motherboard;
      pass_max = this.model.max_motherboard;
    }
    else if (category == "cpu") {
      this.model.cpuVisible = false;
      pass_min = this.model.min_cpu;
      pass_max = this.model.max_cpu;
    }
    else if (category == "ram") {
      this.model.ramVisible = false;
      pass_min = this.model.min_ram;
      pass_max = this.model.max_ram;
    }
    else if (category == "vga") {
      this.model.vgaVisible = false;
      pass_min = this.model.min_vga;
      pass_max = this.model.max_vga;
    }
    else if (category == "hard_disk") {
      this.model.hard_diskVisible = false;
      pass_min = this.model.min_hard_disk;
      pass_max = this.model.max_hard_disk;
    }
    this.pcpartServiceService.changePCPart(category, pass_min, pass_max, arr).subscribe(data => {
        if(data["res"] != null || data != null){
          if (category == "ram") {
            this.model.Ram = data["res"][this.model.budget_loop];
            if (this.model.Ram["price"] != null) {
              this.model.total_price = this.model.total_price + parseFloat(this.model.Ram["price"]);
            }
            this.model.ramVisible = true;
          }
          else if (category == "vga") {
            this.model.Vga = data["res"][this.model.budget_loop];
            if (this.model.Vga["price"] != null) {
              this.model.total_price = this.model.total_price + parseFloat(this.model.Vga["price"]);
            }
            this.model.vgaVisible = true;
          }
          else if (category == "cpu") {
            this.model.Cpu = data["res"][this.model.budget_loop];
            if (this.model.Cpu["price"] != null) {
              this.model.total_price = this.model.total_price + parseFloat(this.model.Cpu["price"]);
            }
            this.model.cpuVisible = true;
          }
          else if (category == "motherboard") {
            this.model.Motherboard = data["res"][this.model.budget_loop];
            if (this.model.Motherboard["price"] != null) {
              this.model.total_price = this.model.total_price + parseFloat(this.model.Motherboard["price"]);
            }
            this.model.motherboardVisible = true;
          }
          else if (category == "hard_disk") {
            this.model.Hard_Disk = data["res"][this.model.budget_loop];
            if (this.model.Hard_Disk["price"] != null) {
              this.model.total_price = this.model.total_price + parseFloat(this.model.Hard_Disk["price"]);
            }
            this.model.hard_diskVisible = true;
          }
        } else {
          this.Swal.fire('Oops...', 'No PC Part Found !!!', 'error')
        }
    },
      (error: any) => console.log(error));
  }

}
