import { Component, OnInit } from '@angular/core';
import { GameService } from '../service/game.service';
import { Router, ActivatedRoute } from "@angular/router";
 

@Component({
  selector: 'app-build-for-requirements',
  templateUrl: './build-for-requirements.component.html',
  styleUrls: ['./build-for-requirements.component.css']
})
export class BuildForRequirementsComponent implements OnInit {

 private search_game = '';
 private games: Object;
 private game = []; 
 private loading = false; 

  constructor(private gameService: GameService, private route: ActivatedRoute, private router: Router) { }

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
          this.game = this.swap(this.games["responseObject"]); 
          console.log(this.games["responseObject"]);
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

  getPCpartList(id:String ){
    console.log(id)
    var game = id
    this.router.navigate(['build_for_gaming/pc-part-list/'+game]);
  }

   swap(arra) {
    [arra[0], arra[arra.length - 1]] = [arra[arra.length - 1], arra[0]];
    return arra;
}

}
