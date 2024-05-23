import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { club_visu } from 'src/view-model/club_visu';
import { ActivatedRoute, Router } from '@angular/router';
import { CompetitionsService } from 'src/services/competitions.service';
import { MatchService } from 'src/services/match.service';
import { JoueurService } from 'src/services/joueur.service';
import { response_listmatch } from 'src/class/response_listmatch';
import { ErrorService } from 'src/services/error.service';
import { teams } from 'src/class/team';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent implements OnInit{
  visu: club_visu;
  loading:boolean = false;
  action:string;
  from: "EQUIPE" | "ALL" | "SEASON" | "CLUB" = "SEASON";
  value: number;
  selected_sous_menu :"MATCHS" | "JOUEURS" | "CLASSEMENT" | "PALMARES" | "BUTEUR" | "EQUIPES";
  constructor(private route:ActivatedRoute, private router:Router,private comp_serv:CompetitionsService, private match_serv:MatchService, private joueur_serv:JoueurService){}
  ngOnInit(): void {
    this.loading = true;
    this.visu = new club_visu();
    this.route.queryParams.subscribe(params => {
      if ('id' in params) {
        this.from = "CLUB";
        this.value = params['id'];
      } else if ('team' in params) {
        this.from = "EQUIPE";
        this.value = params['team'];
      } else if ('season' in params) {
        this.from = "SEASON";
        this.value = params['season'];
      }  else {
        this.from = "ALL";
        this.value = null;
      }

    });
    this.Load();
  }

  Load(){
    const errorService = ErrorService.instance;
    console.log(this.from);
    console.log(this.value);
    console.log(this.value);
    switch (this.from) {
      case "EQUIPE":
        this.action = $localize`Charger l'équipe`;
        this.visu.thisTeam = new teams();
        this.match_serv.GetAllMatchTeam(this.value).then((reponse:response_listmatch)=>{
          reponse.list_match.forEach(m => {
            m.team_home_logo = reponse.list_logo.filter(x => x.id == m.club_home_id)[0].logo;
            m.team_away_logo = reponse.list_logo.filter(x => x.id == m.club_away_id)[0].logo;
            m.sporthall = reponse.list_sporthall.filter(x => x.id == m.sporthall_id)[0];
          })
          this.visu.thisTeam.games_list = reponse.list_match;
          this.visu.thisTeam.date_list = new Array<Date>();
          this.visu.thisTeam.games_list.forEach(element => {
            if (!(this.visu.thisTeam.date_list.find(e => e == element.date))) {
              this.visu.thisTeam.date_list.push(element.date);
            }
          });
          this.visu.thisTeam.date_list.sort(function (a, b) {
            return a < b ? 1 : -1;
          });
          this.visu.thisTeam.games_list.sort(
            function (a, b) {
              return a.time > b.time ? 1 : -1;
            }
          );
          this.action = $localize`Charger les joueurs de l'équipe`;
          this.joueur_serv.GetAllPlayersTeam(this.value).then((players) =>{
            this.visu.thisTeam.players = players;
            this.action = $localize`Charger les classements`;
            this.comp_serv.GetRankingsTeam(this.value).then((list_rk) =>{
              if(list_rk.length>0){
                list_rk.forEach(element => {
                  console.log(element);
                  
                });
              } else {
                this.visu.thisTeam.ranking_team = null;
                this.visu.thisTeam.rounds_rk = null;
              }
            })

          }).catch((err) => {
            let o = errorService.CreateError(this.action, err.message);
            errorService.emitChange(o);
          });
        }).catch((err) => {
          let o = errorService.CreateError(this.action, err.message);
          errorService.emitChange(o);
        });
        break;
    
      default:
        break;
    }
  }
}
