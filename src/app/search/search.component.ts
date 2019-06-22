import { Component, OnInit } from '@angular/core';
import { Pcpart } from '../model/pcpart';
import { SearchService } from '../service/search.service';
import { error } from 'protractor';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  pcpart: Pcpart[];

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.getAllPCPartsByCategory();
  }

  getAllPCPartsByCategory() {
    var category = 'RAM';
    var name = 'Kinston 4GB RAM';
    this.searchService.findByName(category, name).subscribe(data => {
      this.pcpart = data;
    },
      (error: any) => console.log(error),
      () => console.log('Gets all data')
    );

    // this.pcpart = [{ id: "0145263", name: "Kingston 4GB RAM", price: "15000.00", category: "RAM", image: "" },
    // { id: "0145263", name: "Kingston 4GB RAM", price: "15000.00", category: "RAM", image: "" },
    // { id: "0145263", name: "Kingston 4GB RAM", price: "15000.00", category: "RAM", image: "" },
    // { id: "0145263", name: "Kingston 4GB RAM", price: "15000.00", category: "RAM", image: "" }];
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
