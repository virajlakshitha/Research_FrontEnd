import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pcpart } from '../model/pcpart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  
})
export class PcpartServiceService {

  private pcpartsUrl: string;
  private gamesUrl: string;
  private buildForPriceUrl: string;

  constructor(private http: HttpClient) { 
    this.pcpartsUrl = 'http://localhost:8080/api-techRing/pcparts/';
    // this.buildForPriceUrl = 'http://localhost:8080/api-techRing/build_for_price/';
    this.buildForPriceUrl = 'http://localhost:8093/api-py-techRing/';
  }

  public changePCPart(pro, val1, val2, arr) {
    return this.http.post(this.buildForPriceUrl+'change_product', {"product": pro, "min": val1, "max": val2, "motherboard": arr["motherboard"], "cpu": arr["cpu"], "ram": arr["ram"], "vga": arr["vga"], "hard_disk": arr["hard_disk"]});
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-type':'application/json'
    })
  }

  public budgetPlan(a, b, c, d, e, f, g, h, i, j) {
    var abc = { "ram_min": a, "ram_max": b, "motherboard_min": c, "motherboard_max": d, "vga_min": e, "vga_max": f, "cpu_min": g, "cpu_max": h, "hard_disk_min": i, "hard_disk_max": j};
    return this.http.post(this.buildForPriceUrl+'build_for_price', abc, this.httpOptions);
  }

  public settingsSubmit(ram_min, ram_max, vga_min, vga_max, cpu_min, cpu_max, motherboard_min, motherboard_max, hard_disk_min, hard_disk_max) {
    console.log("ram_min : "+ram_min+" ram_max : "+ram_max+" motherboard_min : "+motherboard_min+" motherboard_max  : "+motherboard_max+" vga_min : "+vga_min+" vga_max : "+vga_max+" cpu_min : "+cpu_min+" cpu_max : "+cpu_max+" hard_disk_min : "+hard_disk_min+" hard_disk_max : "+hard_disk_max);
    var abc = { "ram_min": ram_min, "ram_max": ram_max, "motherboard_min": motherboard_min, "motherboard_max": motherboard_max, "vga_min": vga_min, "vga_max": vga_max, "cpu_min": cpu_min, "cpu_max": cpu_max, "hard_disk_min": hard_disk_min, "hard_disk_max": hard_disk_max};
    return this.http.post(this.buildForPriceUrl+'build_for_price', abc);
  }

  public getMaxMinBudget() {
    return this.http.get(this.buildForPriceUrl+'max_min_budget');
  }
}
