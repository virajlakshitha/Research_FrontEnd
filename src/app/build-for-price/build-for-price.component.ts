import { Component, OnInit } from '@angular/core';
import { Pcpart } from '../model/pcpart';
import { PcpartServiceService } from '../service/pcpart-service.service';

@Component({
  selector: 'app-build-for-price',
  templateUrl: './build-for-price.component.html',
  styleUrls: ['./build-for-price.component.css']
})
export class BuildForPriceComponent implements OnInit {

  pcpart: Pcpart[];

  constructor(private pcpartServiceService: PcpartServiceService) { }

  ngOnInit() {
    this.getAllPCParts();
  }

  getAllPCParts() {
    this.pcpartServiceService.findAll().subscribe(data => {
      this.pcpart = data;
    },
    (error: any) => console.log(error),
    () => console.log('Gets all data')
  );
  }

}
