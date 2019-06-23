import { Component, OnInit } from '@angular/core';
import { Pcpart } from '../model/pcpart';
import { Comments } from '../model/comments';
import { VendorPrice } from '../model/vendor-price';
import { SearchService } from '../service/search.service';
import { error } from 'protractor';

@Component({
  selector: 'app-more-details',
  templateUrl: './more-details.component.html',
  styleUrls: ['./more-details.component.css']
})
export class MoreDetailsComponent implements OnInit {

  pcPart: Pcpart;
  comments1: Comments[];
  vendorPrice: VendorPrice[];

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.getPartDetails('RAM','15151A0154');
    this.getComments('4GB Kingston RAM');
    this.getVendorPrices('4GB Kingston RAM');
  }

  getPartDetails(category: string, id: string) {
    this.searchService.findById(category, id).subscribe(data => {
      this.pcPart = data;
    },
      (error: any) => console.log(error),
      () => console.log('Gets all data')
    );

    // this.pcPart = { id: "0145263", name: "Kingston 4GB RAM", price: "15000.00", category: "RAM", image: "" };
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
      this.vendorPrice = data;
    },
      (error: any) => console.log(error),
      () => console.log('Gets all data')
    );

    this.vendorPrice = [{ name: "RedLine", price: "15000.00" },
                      { name: "Nanotech", price: "14000.00" }];
  }
}
