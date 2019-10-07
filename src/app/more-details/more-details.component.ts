import { Component, OnInit } from '@angular/core';
import { SearchService } from '../service/search.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { SentimentAnalysis } from './sentiment_analysis';
import { Model } from './model';

@Component({
  selector: 'app-more-details',
  templateUrl: './more-details.component.html',
  styleUrls: ['./more-details.component.css']
})
export class MoreDetailsComponent implements OnInit {

  private model: Model;

  constructor(private searchService: SearchService, private route: ActivatedRoute, private router: Router) {
    this.model = new Model();
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
      console.log(this.model.PC_part_name)
    },
      (error: any) => console.log(error)
    );

    this.getVendorPrices(this.model.category, name);
    // this.getComments();

    this.searchService.analyzeComments("Sobadhara - Sri Lanka Wildlife Documentary | 2019-08-30 | (පාද යාත්‍රා) Padayathra").subscribe(data => {
      let abc = new SentimentAnalysis(data["avg_compound_value"]);
      this.model.positive = +abc.value * 100;
      this.model.negative = 100 - this.model.positive;
      this.model.load_for_comment = false;
      this.model.isShowChart = true;
    },
      (error: any) => console.log(error));

    if(localStorage.getItem('username')){
      this.model.logged_in = "true";
    }
    
  }

  getPartDetails(category: string, id: string) {
    this.searchService.findById(category, id).subscribe(data => {
      this.model.pcpart = data["responseObject"];
      console.log(this.model.pcpart);
    },
      (error: any) => console.log(error),
      () => console.log('Gets all data')
    );
  }

  getComments() {
    this.searchService.getComments().subscribe(data => {
      this.model.comments = data["responseObject"];
      console.log(this.model.comments);
    },
      (error: any) => console.log(error),
      () => console.log('Gets all data')
    );
  }

  getVendorPrices(category, name) {
    this.searchService.getVendorPrices(category, name).subscribe(data => {
      console.log(data["responseObject"]);
      this.model.vendorPrice = data["responseObject"];
    },
      (error: any) => console.log(error),
      () => console.log('Gets all data')
    );

    this.model.vendorPrice = [{ name: "RedLine", price: "15000.00" },
    { name: "Nanotech", price: "14000.00" }];
  }

  getVendorDetails(pro_name: string, category: string) {
    this.searchService.getVendorDetailsForProducts(pro_name, category).subscribe(data => {
      console.log(data);
      this.model.vendorDetails = data["responseObject"];
    },
      (error: any) => console.log(error));
  }

  pushNotification(user_id: string, product: string, price: string) {
    this.searchService.pushNotification(user_id, product).subscribe(data => {
      console.log("Success");
    },
      (error: any) => console.log(error)
    );
  }

}