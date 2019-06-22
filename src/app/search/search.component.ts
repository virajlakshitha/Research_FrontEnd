import { Component, OnInit } from '@angular/core';
import { Pcpart } from '../model/pcpart';
import { SearchService } from '../service/search.service';
import { error } from 'protractor';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  pcpart: Object;
  pcParts = [];

  constructor(private searchService: SearchService, private route : ActivatedRoute) { }

  ngOnInit() {
    var category;
    var name;
    this.route.params.subscribe(params => {
      category = 'RAM';
      name = params["name"];
    });
    this.getAllPCPartsByCategory(category, name);
  }

  getAllPCPartsByCategory(category, name) {
    this.searchService.findByName(category, name).subscribe(data => {
      this.pcpart = data;
      
    },
      (error: any) => console.log(error),
      () => console.log('Gets all data')
    );
    var txt = '[{"name": "Viraj", "price": 2500.00}]';
    var obj = JSON.parse(txt);
    console.log(obj);
  }

  getSortedProducts(option: string) {
    this.searchService.sortProducts(option).subscribe(data => {
      this.pcpart = data;
    },
      (error: any) => console.log(error),
      () => console.log('Gets all data')
    );
  }

}
