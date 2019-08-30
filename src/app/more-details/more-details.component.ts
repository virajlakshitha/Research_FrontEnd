import { Component, OnInit } from '@angular/core';
import { Pcpart } from '../model/pcpart';
import { Comments } from '../model/comments';
import { VendorPrice } from '../model/vendor-price';
import { SearchService } from '../service/search.service';
import { error } from 'protractor';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-more-details',
  templateUrl: './more-details.component.html',
  styleUrls: ['./more-details.component.css']
})
export class MoreDetailsComponent implements OnInit {

  pcpart: Object;
  comments1: Object;
  vendorPrice = [];
  vendorDetails: Object;
  logged_in = 'false';

  constructor(private searchService: SearchService, private route : ActivatedRoute, private router: Router) { }

  ngOnInit() {
    var category;
    var id;
    this.route.params.subscribe(params => {
      category = params["category"];
      id = params["_id"];
    });
    this.getPartDetails(category,id);
    this.getComments('Kingston');
    this.getVendorPrices('Kingston');
  }

  getPartDetails(category: string, id: string) {
    this.searchService.findById(category, id).subscribe(data => {
      this.pcpart = data["responseObject"];
      console.log(this.pcpart);
    },
      (error: any) => console.log(error),
      () => console.log('Gets all data')
    );

  }

  getComments(name: string) {
    this.searchService.getComments(name).subscribe(data => {
      this.comments1 = data;
    },
      (error: any) => console.log(error),
      () => console.log('Gets all data')
    );

    // this.comments = [{ part_name: "Kingston 4GB RAM", user_name: "Viraj LK", comments: "Great Item", rating: 3 }];
    this.comments1 = [{ part_name: "Kingston 4GB RAM", user_name: "Viraj LK", comment: "Great Item", rating: "3" },
    { part_name: "Kingston 4GB RAM", user_name: "Viraj LK", comment: "Great Item", rating: "3" }];
  }

  getVendorPrices(name: string) {
    this.searchService.getVendorPrices(name).subscribe(data => {
      this.vendorPrice = data["responseObject"];
    },
      (error: any) => console.log(error),
      () => console.log('Gets all data')
    );

    this.vendorPrice = [{ name: "RedLine", price: "15000.00" },
                      { name: "Nanotech", price: "14000.00" }];
  }

  getVendorDetails(pro_name: string, category: string) {
    this.searchService.getVendorDetailsForProducts(pro_name, category).subscribe(data => {
      this.vendorDetails = data;
    },
    (error: any) => console.log(error));
  }

  notify() {
    if(this.logged_in == 'false') {
      
    }
    else if(this.logged_in == 'true') {
      
    }
  }

}
