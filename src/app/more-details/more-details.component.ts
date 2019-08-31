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
  comments = [];
  vendorPrice = [];
  vendorDetails: Object;
  logged_in = 'false';
  loading = 'false';

  constructor(private searchService: SearchService, private route : ActivatedRoute, private router: Router) { }

  ngOnInit() {
    var category;
    var id;
    this.route.params.subscribe(params => {
      category = params["category"];
      id = params["_id"];
    });

    var name;
    this.searchService.findById(category, id).subscribe(data => {
      this.loading = 'false';
      this.pcpart = data["responseObject"];
      if(data["responseCode"] == "111"){
        this.getComments(this.pcpart["name"]);
        this.getVendorPrices(category, this.pcpart["name"]);
      }
      else{
        console.log("error 1");
      }
      
    },
      (error: any) => console.log(error)
    );
    this.loading = 'true';
  }

  getPartDetails(category: string, id: string) {
    this.searchService.findById(category, id).subscribe(data => {
      this.loading = 'false';
      this.pcpart = data["responseObject"];
      console.log(this.pcpart);
      this.loading = 'true';
    },
      (error: any) => console.log(error),
      () => console.log('Gets all data')
    );

  }

  getComments(name) {
    console.log(name);
    this.searchService.getComments(name).subscribe(data => {
      this.comments = data["responseObject"];
      console.log(this.comments);
    },
      (error: any) => console.log(error),
      () => console.log('Gets all data')
    );
    
  }

  getVendorPrices(category, id) {
    this.searchService.getVendorPrices(category, id).subscribe(data => {
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

  pushNotification(user_id: string, product: string, price: string) {
    this.searchService.pushNotification(user_id, product).subscribe(data => {
      alert("Success");
    },
      (error: any) => console.log(error)
    );
  }

}
