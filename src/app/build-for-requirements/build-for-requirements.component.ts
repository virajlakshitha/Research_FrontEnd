import { Component, OnInit } from '@angular/core';
import { GameService } from '../service/game.service';
 

@Component({
  selector: 'app-build-for-requirements',
  templateUrl: './build-for-requirements.component.html',
  styleUrls: ['./build-for-requirements.component.css']
})
export class BuildForRequirementsComponent implements OnInit {

  search_game = '';
  games: Object;
  game = []; 
  loading = false;


  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.getGames();
  }

  searchGame() {
    this.loading = true;
    console.log('game name' + this.search_game);
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

  scrapeGame() {
    this.loading = true;
    this.gameService.scarpeGame(this.search_game).subscribe(
      data => { 
          this.ngOnInit();
          this.loading = false;
      }
    );
  }

}
