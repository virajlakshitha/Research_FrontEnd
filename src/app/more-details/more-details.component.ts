import { Component, OnInit } from '@angular/core';
import { Pcpart } from '../model/pcpart';
import { Comments } from '../model/comments';
import { VendorPrice } from '../model/vendor-price';
import { SearchService } from '../service/search.service';
import { error } from 'protractor';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { SentimentAnalysis } from './sentiment_analysis';

@Component({
  selector: 'app-more-details',
  templateUrl: './more-details.component.html',
  styleUrls: ['./more-details.component.css']
})
export class MoreDetailsComponent implements OnInit {

  PC_part_name:string;
  pcpart: Object;
  comments = [];
  vendorPrice = [];
  vendorDetails: Object;
  logged_in = 'false';
  loading = 'false';
  load_for_comment: boolean;
  positive: number ;
  negative: number ;
  isShowChart:boolean = false;

  constructor(private searchService: SearchService, private route : ActivatedRoute, private router: Router) { }

  title = 'Analysis results of feedback';
  type = 'PieChart'; 
  columnNames = ['Browser', 'Percentage'];
  options = {    
  };
  width = 550;
  height = 400;
   
  ngOnInit() {
    this.load_for_comment = true;
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
      name = this.pcpart["name"];
      this.PC_part_name = this.pcpart["name"];
      console.log(this.PC_part_name)
    },
      (error: any) => console.log(error)
    );
    this.loading = 'true';
    this.getComments();
    this.getVendorPrices(category, name);

    // console.log("--------------------------"+this.pcpart["name"])
    // this.searchService.analyzeComments(this.pcpart["name"]).subscribe(data => {
      console.log("---------*******"+this.PC_part_name)
    this.searchService.analyzeComments("https://www.youtube.com/watch?v=Urk2U14iMPs").subscribe(data => { 
      let abc = new SentimentAnalysis(data["avg_compound_value"])
     
       console.log("----------***" + JSON.stringify(abc.value)) 
       console.log("----------***" +  data) 

       this.positive = +abc.value * 100;
       this.negative = 100 - this.positive;
       console.log("")
       this.load_for_comment = false;
       this.isShowChart = true;
    },
    (error: any) => console.log(error)
    );
    
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

  getComments() {
    this.searchService.getComments().subscribe(data => {
      this.comments = data["responseObject"];
      console.log(this.comments);
    },
      (error: any) => console.log(error),
      () => console.log('Gets all data')
    );
    
  }

  getVendorPrices(category, name) {
    this.searchService.getVendorPrices(category, name).subscribe(data => {
      console.log(data["responseObject"]);
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
      console.log(data);
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
