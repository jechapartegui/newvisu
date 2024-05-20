import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { game_events } from 'src/class/game_events';
import { player_game } from 'src/class/player_game_detail';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-event',
  templateUrl: './game-event.component.html',
  styleUrls: ['./game-event.component.css']
})
export class GameEventComponent implements OnInit {
  @Input() event:game_events;
  @Input() team_home_id:number;
  @Input() team_away_id:number;
  @Input() away_players:player_game[];
  @Input() home_players:player_game[];
  constructor(private router:Router){}
ngOnInit(): void {
  
  console.log(this.event);
    if(this.event.playerid1){
      if(this.home_players.some(x => x.id == this.event.playerid1)){
        this.event.player1photo = this.home_players.find(x => x.id == this.event.playerid1).photo;
      }
      if(this.away_players.some(x => x.id == this.event.playerid1)){
        this.event.player1photo = this.away_players.find(x => x.id == this.event.playerid1).photo;
      }
    }
    if(this.event.playerid2){
      if(this.home_players.some(x => x.id == this.event.playerid2)){
        this.event.player2photo = this.home_players.find(x => x.id == this.event.playerid2).photo;
      }
      if(this.away_players.some(x => x.id == this.event.playerid2)){
        this.event.player2photo = this.away_players.find(x => x.id == this.event.playerid2).photo;
      }
    }
}

GoToJoueur(id:number){
  this.router.navigate(['/joueur'], { queryParams: { id: id } });     
}
}
