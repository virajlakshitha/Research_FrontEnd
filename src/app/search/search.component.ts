import { Component, OnInit } from '@angular/core';
import { Search } from './search.model';
import { SearchService } from '../service/search.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private pcParts = [];
  private code;
  private search: Search;
  c: Number = 1;
  count: Number = 10;
  private isVisible;

  constructor(private searchService: SearchService, private route: ActivatedRoute, private router: Router) {
    this.search = new Search();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.search.category = params["category"];
      this.search.name = params["name"];
    });
    this.getAllPCPartsByCategory(this.search.category, this.search.name);
    this.isVisible = false;
  }

  redirect(_id): void {
    this.router.navigate(['/product_details/' + this.search.category + '/' + _id]);
  }

  getAllPCPartsByCategory(category, name) {
    this.searchService.findByName(category, name).subscribe(data => {
      this.isVisible = true;
      this.code = data["responseCode"];
      if(this.code != "000"){
        this.pcParts = data["responseObject"];
      }
      console.log(data);
    },
      (error: any) => console.log(error));
    console.log(this.code);
  }

  getSortedProducts(option) {
    console.log(option);
    this.searchService.sortProducts(this.search.category, this.search.name, option).subscribe(data => {
      this.pcParts = data["responseObject"];
      this.code = data["responseCode"];
    },
      (error: any) => console.log(error));
  }



}
