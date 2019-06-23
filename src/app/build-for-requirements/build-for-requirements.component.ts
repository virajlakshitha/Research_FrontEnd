import { Component, OnInit } from '@angular/core';
import { GameService } from '../service/game.service';
 

@Component({
  selector: 'app-build-for-requirements',
  templateUrl: './build-for-requirements.component.html',
  styleUrls: ['./build-for-requirements.component.css']
})
export class BuildForRequirementsComponent implements OnInit {

  games: Object;
  game = [];

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.getGames();
  }

  getGames() {

    this.gameService.getAllGames().subscribe(
      data => {
          this.games = data;
          this.game = this.games["responseObject"];
          console.log(this.games["responseObject"][0].ram);
          console.log(this.games["responseObject"][0].id);
      }
    );
  }
}
