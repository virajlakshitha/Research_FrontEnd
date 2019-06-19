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
  comments: Comments[];
  vendorPrice: VendorPrice[];

  constructor(private searchService: SearchService) { }

  ngOnInit() {
    this.getPartDetails('RAM','15151A0154');
    this.getComments('4GB Kingston RAM');
  }

  getPartDetails(category: string, id: string) {
    this.searchService.findById(category, id).subscribe(data => {
      this.pcPart = data;
    },
      (error: any) => console.log(error),
      () => console.log('Gets all data')
    );
  }

  getComments(name: string) {
    this.searchService.getComments(name).subscribe(data => {
      this.comments = data;
    },
      (error: any) => console.log(error),
      () => console.log('Gets all data')
    );
  }

  getVendorPrices(name: string) {
    this.searchService.getVendorPrices(name).subscribe(data => {
      this.vendorPrice = data;
    },
      (error: any) => console.log(error),
      () => console.log('Gets all data')
    );
  }

}
