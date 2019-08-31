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
    this.buildForPriceUrl = 'http://localhost:8080/api-techRing/build_for_price/';
  }

  public findMaximum() {

    return this.http.get(this.pcpartsUrl);
  }

  public findById(_id: string): Observable<Pcpart> {
    return this.http.get<Pcpart>(this.pcpartsUrl+_id);
  }

  public findByPriceRange(min, max) {
    return this.http.get(this.buildForPriceUrl+min+'/'+max);
  }

  public changePCPart(pro, arr) {
    return this.http.get(this.buildForPriceUrl+'change/'+pro+'/'+arr["motherboard"]+'/'+arr["cpu"]+'/'+arr["ram"]+'/'+arr["vga"]+'/'+arr["hard_disk"]);
  }

  public budgetPlan(min, max) {
    return this.http.get(this.buildForPriceUrl+'budgetPlan/'+min+'/'+max);
  }

  public settingsSubmit(ram_min, ram_max, vga_min, vga_max, cpu_min, cpu_max, motherboard_min, motherboard_max, hard_disk_min, hard_disk_max) {
    return this.http.get(this.buildForPriceUrl+'budgetPlan_price/'+ram_min+'/'+ram_max+'/'+vga_min+'/'+vga_min+'/'+cpu_min+'/'+cpu_max+'/'+motherboard_min+'/'+motherboard_max+'/'+hard_disk_min+'/'+hard_disk_max);
  }

  public getMaxMinBudget() {
    return this.http.get(this.buildForPriceUrl+'max_min_budget/');
  }
}
