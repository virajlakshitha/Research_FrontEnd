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
    this.getAllPCPartsByCategory('RAM', 'Kinston 4GB RAM');
  }

  getAllPCPartsByCategory(category: string, name: string) {
    this.searchService.findByName(category, name).subscribe(data => {
      this.pcpart = data;
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
  }

}
