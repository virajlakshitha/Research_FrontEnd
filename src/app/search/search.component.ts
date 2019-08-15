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
      (error: any) => console.log(error),
      () => console.log('Gets all data')
    );
    this.loading = 'true';
  }

  getSortedProducts(option: string) {
    this.searchService.sortProducts(option).subscribe(data => {
      this.pcParts = this.pcpart["responseObject"];
    },
      (error: any) => console.log(error),
      () => console.log('Gets all data')
    );
  }

  pushNotification(user_id: string, product: string, price: string) {
    this.searchService.pushNotification(user_id, product, price).subscribe(data => {

    },
      (error: any) => console.log(error),
      () => console.log('Gets all data')
    );
  }

  sortProducts(number) {
    if(number == 0){

    } else if(number == 1) {

    } else if(number == 2) {

    } else if(number == 3) {

    }
    console.log(number);
  }

}
