import { Component, OnInit } from '@angular/core';
import { Pcpart } from '../model/pcpart';
import { SearchService } from '../service/search.service';
import { error } from 'protractor';
import {ActivatedRoute} from '@angular/router';
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  pcpart: Object;
  pcParts = [];
  name;
  category;

  constructor(private searchService: SearchService, private route : ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.category = params["category"];
      this.name = params["name"];
    });
    this.getAllPCPartsByCategory(this.category, this.name);
    if(this.category == "ram"){
      
    }
  }

  redirect(_id): void {
    this.router.navigate(['/product_details/'+this.category+'/'+_id]);
  }

  getAllPCPartsByCategory(category, name) {
    this.searchService.findByName(category, name).subscribe(data => {
      this.pcpart = data;
      this.pcParts = this.pcpart["responseObject"];
      console.log(data);
    },
      (error: any) => console.log(error),
      () => console.log('Gets all data')
    );
    
  }

  getSortedProducts(option: string) {
    this.searchService.sortProducts(option).subscribe(data => {
      this.pcpart = data;
    },
      (error: any) => console.log(error),
      () => console.log('Gets all data')
    );
    // var txt = '[{"_id": "141151","name": "Viraj", "price": 2500.00}]';
    // this.pcParts = JSON.parse(txt);
    // console.log(this.pcParts);
  }

}
