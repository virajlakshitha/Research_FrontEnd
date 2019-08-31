import { Component, OnInit } from '@angular/core';
import { Pcpart } from '../model/pcpart';
import { SearchService } from '../service/search.service';
import { error } from 'protractor';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { LoadingComponent } from '../loading/loading.component';

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
  loading = 'true';

  constructor(private searchService: SearchService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.category = params["category"];
      this.name = params["name"];
    });
    this.getAllPCPartsByCategory(this.category, this.name);
  }

  redirect(_id): void {
    this.router.navigate(['/product_details/' + this.category + '/' + _id]);
  }

  getAllPCPartsByCategory(category, name) {
    this.loading = 'true';
    this.searchService.findByName(category, name).subscribe(data => {
      this.pcpart = data;
      this.pcParts = this.pcpart["responseObject"];
      console.log(data);
    },
      (error: any) => console.log(error)
    );
    this.loading = 'false';
  }

  getSortedProducts(option) {
    this.loading = 'true';
    this.searchService.sortProducts(this.category, this.name, option).subscribe(data => {
      this.pcpart = data;
      this.pcParts = this.pcpart["responseObject"];
    },
      (error: any) => console.log(error)
    );
    this.loading = 'false';
  }

  

}
