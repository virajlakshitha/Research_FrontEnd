import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  private gameurl: string;

  constructor(private http: HttpClient) { 
    this.gameurl = 'http://localhost:8080/api-techRing/games/';  
  }

  public getAllGames() {
    return this.http.get(this.gameurl+'getAll');
  }

  public scarpeGame(game:string) {
    return this.http.get(this.gameurl+ game +'/getgame');
  } 

}
