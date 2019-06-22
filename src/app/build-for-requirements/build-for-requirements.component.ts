import { Component, OnInit } from '@angular/core';
import { PcpartServiceService } from '../service/pcpart-service.service';

@Component({
  selector: 'app-build-for-requirements',
  templateUrl: './build-for-requirements.component.html',
  styleUrls: ['./build-for-requirements.component.css']
})
export class BuildForRequirementsComponent implements OnInit {

  constructor(private pcpartServiceService: PcpartServiceService) { }

  ngOnInit() {
    this.getMaximumPCParts();
  }

  getMaximumPCParts() {
    var data;
    this.pcpartServiceService.getAllGames().subscribe(data => {
      data = data;
    },
    (error: any) => console.log(error),
    () => console.log('Gets all data'));
    console.log(data);
  }
}
