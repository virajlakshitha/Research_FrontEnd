import { Component, OnInit } from '@angular/core';
import { PcpartServiceService } from '../service/pcpart-service.service';
import { Pcpart } from '../model/pcpart';

@Component({
  selector: 'app-build-for-requirements',
  templateUrl: './build-for-requirements.component.html',
  styleUrls: ['./build-for-requirements.component.css']
})
export class BuildForRequirementsComponent implements OnInit {

  games: Object;
  game = [];

  constructor(private pcpartServiceService: PcpartServiceService) { }

  ngOnInit() {
    this.getMaximumPCParts();
  }

  getMaximumPCParts() {

    this.pcpartServiceService.getAllGames().subscribe(
      data => {
          this.games = data;
          this.game = this.games["responseObject"];
          console.log(this.games["responseObject"][0].id);
      }
    );
  }
}
