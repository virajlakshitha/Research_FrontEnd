import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  private gameurl: string;
  private scrapeGame : string;

  constructor(private http: HttpClient) { 
    this.gameurl = 'http://localhost:8080/api-techRing/games/';  
    this.scrapeGame = 'http://localhost:8093/api-py-techRing/';
  }

  public getAllGames() {
    return this.http.get(this.gameurl+'getAll');
  }

  // public scarpeGame(game:string) {
  //   return this.http.get(this.gameurl+ game +'/getgame');
  // } 

  public scarpeGame(game) {
    return this.http.post(this.scrapeGame+'scrape_game', {"game":game} );
  } 

  // public saveCustomer(username, email, password){
  //   return this.http.post(this.userUrl+'create/customer', [username, email, password]);
  // }

}
