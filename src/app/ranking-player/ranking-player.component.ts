import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ranking_player } from 'src/class/ranking_points';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ranking-player',
  templateUrl: './ranking-player.component.html',
  styleUrls: ['./ranking-player.component.css']
})
export class RankingPlayerComponent {
  @Input() ranking: ranking_player[];
  @Input() type: "GOALIE" | "SCORER";
  public SelTeam: number = null;
  public sort: "BUT_ASC" | "BUT_DESC" | "ASS_ASC" | "ASS_DESC" | "PTS_ASC" | "PTS_DESC" | "MJ_ASC" | "MJ_DESC" | "ARR_ASC" | "ARR_DESC" | "CONC_ASC" | "CONC_DESC" | "PERC_ASC" | "PERC_DESC" | "NO" = "NO";
  constructor(public router: Router) { }
  GoToTeam(id) {
    this.router.navigate(['/clubs'], { queryParams: { team: id } });
  }
  GoToPlayer(id) {
    this.router.navigate(['/joueurs'], { queryParams: { id: id } });
  }
  Sort(type: "BUT" | "ASS" | "MJ" | "PTS" | "ARR" | "CONC" | "PERC") {
    switch (type) {
      case "BUT":
        if(this.sort == "BUT_DESC"){
          this.sort = "BUT_ASC";
        } else {
          this.sort = "BUT_DESC"
        }
        if(this.sort == "BUT_ASC"){
          this.ranking.sort((a, b) => Number(a.goals) < Number(b.goals) ? -1 : Number(a.goals) > Number(b.goals) ? 1 : 0);
        } else{
          this.ranking.sort((a, b) => Number(a.goals) > Number(b.goals) ? -1 : Number(a.goals) < Number(b.goals) ? 1 : 0);
        }
        break;
      case "ASS":
        if(this.sort == "ASS_DESC"){
          this.sort = "ASS_ASC";
        } else {
          this.sort = "ASS_DESC"
        }
        if(this.sort == "ASS_ASC"){
          this.ranking.sort((a, b) => Number(a.assists) < Number(b.assists) ? -1 : Number(a.assists) > Number(b.assists) ? 1 : 0);
        } else{
          this.ranking.sort((a, b) => Number(a.assists) > Number(b.assists) ? -1 : Number(a.assists) < Number(b.assists) ? 1 : 0);
        }
        break;
      case "MJ":
        if(this.sort == "MJ_DESC"){
          this.sort = "MJ_ASC";
        } else {
          this.sort = "MJ_DESC"
        }
        if(this.sort == "MJ_ASC"){
          this.ranking.sort((a, b) => Number(a.games_played) < Number(b.games_played) ? -1 : Number(a.games_played) > Number(b.games_played) ? 1 : 0);
        } else{
          this.ranking.sort((a, b) => Number(a.games_played) > Number(b.games_played) ? -1 : Number(a.games_played) < Number(b.games_played) ? 1 : 0);
        }
        break;
      case "PTS":
        if(this.sort == "PTS_DESC"){
          this.sort = "PTS_ASC";
        } else {
          this.sort = "PTS_DESC"
        }
        if(this.sort == "PTS_ASC"){
          this.ranking.sort((a, b) => Number(a.points) < Number(b.points) ? -1 : Number(a.points) > Number(b.points) ? 1 : 0);
        } else{
          this.ranking.sort((a, b) => Number(a.points) > Number(b.points) ? -1 : Number(a.points) < Number(b.points) ? 1 : 0);
        }
        break;
      case "ARR":
        if(this.sort == "ARR_DESC"){
          this.sort = "ARR_ASC";
        } else {
          this.sort = "ARR_DESC"
        }
        if(this.sort == "ARR_ASC"){
          this.ranking.sort((a, b) => Number(a.saves) < Number(b.saves) ? -1 : Number(a.saves) > Number(b.saves) ? 1 : 0);
        } else{
          this.ranking.sort((a, b) => Number(a.saves) > Number(b.saves) ? -1 : Number(a.saves) < Number(b.saves) ? 1 : 0);
        }
        break;
      case "CONC":
        if(this.sort == "CONC_ASC"){
          this.sort = "CONC_DESC";
        } else {
          this.sort = "CONC_ASC"
        }
        if(this.sort == "CONC_DESC"){
          this.ranking.sort((a, b) => Number(a.goals_allowed) > Number(b.goals_allowed) ? -1 : Number(a.goals_allowed) < Number(b.goals_allowed)? 1 : 0);
        } else{
          this.ranking.sort((a, b) => Number(a.goals_allowed) < Number(b.goals_allowed) ? -1 : Number(a.goals_allowed) > Number(b.goals_allowed) ? 1 : 0);
        }
        break;
      case "PERC":
        if(this.sort == "PERC_DESC"){
          this.sort = "PERC_ASC";
        } else {
          this.sort = "PERC_DESC"
        }
        if(this.sort == "PERC_ASC"){
          this.ranking.sort((a, b) => Number(a.percentage) < Number(b.percentage) ? -1 : Number(a.percentage) > Number(b.percentage) ? 1 : 0);
        } else{
          this.ranking.sort((a, b) => Number(a.percentage) > Number(b.percentage) ? -1 : Number(a.percentage) < Number(b.percentage) ? 1 : 0);
        }
        break;
    }
  }
}
