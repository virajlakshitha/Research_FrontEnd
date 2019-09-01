import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { GameService } from '../../service/game.service';

@Component({
  selector: 'app-compatible-pc-part-list',
  templateUrl: './compatible-pc-part-list.component.html',
  styleUrls: ['./compatible-pc-part-list.component.css']
})
export class CompatiblePcPartListComponent implements OnInit {
  
  constructor(private gameService: GameService, private route: ActivatedRoute, private router: Router) { }

  private game_id: string;
  private game: string;


  ngOnInit() {
    this.route.params.subscribe(params => {
      this.game_id = params["_id"];
      
      console.log(this.game_id)

      this.gameService.getGame(this.game_id).subscribe(
        data => {  
          console.log(data['responseObject'])

          this.game = data['responseObject']
        }
      );
    });
  }

}
