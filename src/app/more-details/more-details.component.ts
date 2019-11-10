import { Component, OnInit } from '@angular/core';
import { SearchService } from '../service/search.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { SentimentAnalysis } from './sentiment_analysis';
import { Model } from './model';
import * as swal from 'sweetalert2';

@Component({
  selector: 'app-more-details',
  templateUrl: './more-details.component.html',
  styleUrls: ['./more-details.component.css']
})
export class MoreDetailsComponent implements OnInit {

  private model: Model;
  private Swal;

  constructor(private searchService: SearchService, private route: ActivatedRoute, private router: Router) {
    this.model = new Model();
    this.Swal = require('sweetalert2');
  }

  ngOnInit() {
    this.model.load_for_comment = true;
    this.route.params.subscribe(params => {
      this.model.category = params["category"];
      this.model.id = params["_id"];
    });

    this.searchService.findById(this.model.category, this.model.id).subscribe(data => {
      this.model.pcpart = data["responseObject"];
      this.model.name = this.model.pcpart["name"];
      this.model.PC_part_name = this.model.pcpart["name"];
      
      this.model.positive = this.model.pcpart["user_rating"];
      this.model.negative = this.model.pcpart["user_rating_neg"];

      this.model.isShowChart = true;
      this.getComments(this.model.PC_part_name);
      console.log(this.model.PC_part_name)
    },
      (error: any) => console.log(error)
    );

    this.getVendorPrices(this.model.category, this.model.name);
    

    // this.searchService.analyzeComments("Sobadhara - Sri Lanka Wildlife Documentary | 2019-08-30 | (පාද යාත්‍රා) Padayathra").subscribe(data => {
    //   let abc = new SentimentAnalysis(data["avg_compound_value"]);
    //   this.model.positive = +abc.value * 100;
    //   this.model.negative = 100 - this.model.positive;
    //   this.model.load_for_comment = false;
    //   this.model.isShowChart = true;
    // },
    //   (error: any) => console.log(error));

    if (localStorage.getItem('username')) {
      this.model.logged_in = true;
    }
    
    this.model.isVisible = false;
    
  }

  getPartDetails(category: string, id: string) {
    this.searchService.findById(category, id).subscribe(data => {
      this.model.pcpart = data["responseObject"];
      this.model.isVisible = true;
    },
      (error: any) => console.log(error));
  }

  getComments(name) {
    console.log("name : "+name);
    this.searchService.getComments(name).subscribe(data => {
      console.log(data);
      this.model.comments = data["res"];
      this.model.rating = data["rating"];
    },
      (error: any) => console.log(error));
  }

  getVendorPrices(category, name) {
    this.searchService.getVendorPrices(category, name, "ebay").subscribe(data => {
      console.log(data["responseObject"]);
      this.model.vendorPrice = data["responseObject"];
      this.model.ebay_price = data["responseObject"]["ebay"];
    },
      (error: any) => console.log(error));

    this.searchService.getVendorPrices(category, name, "nanotek").subscribe(data => {
      console.log(data["responseObject"]);
      this.model.vendorPrice = data["responseObject"];
      this.model.nanotek_price = data["responseObject"]["nanotek_price"];
    },
      (error: any) => console.log(error));

    this.searchService.getVendorPrices(category, name, "redline").subscribe(data => {
      console.log(data["responseObject"]);
      this.model.vendorPrice = data["responseObject"];
      this.model.redline_price = data["responseObject"]["redline_price"];
    },
      (error: any) => console.log(error));
  }

  getVendorDetails(pro_name: string, category: string) {
    this.searchService.getVendorDetailsForProducts(pro_name, category).subscribe(data => {
      console.log(data);
      this.model.vendorDetails = data["responseObject"];
    },
      (error: any) => console.log(error));
  }

  pushNotification(product: string, price: string) {
    var username;
    if (localStorage.getItem('username')) {
      username = localStorage.getItem('username');
      username = "virajlakshitha39@gmail.com";
      this.searchService.pushNotification(username, product, price).subscribe(data => {
        console.log(data);
        if (data["responseObject"] != null){
          this.Swal.fire('Ooops', 'Something is wrong !!!', 'error');
        }
        else{
          this.Swal.fire('Success', 'We will inform you when a price drop happens !!!', 'success');
        }
      },
        (error: any) => console.log(error)
      );
    }
    else {
      this.Swal.fire('Oops...', 'You have not logged in !!!', 'error')
    }
  }

}