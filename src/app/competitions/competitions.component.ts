import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { categories } from 'src/class/category';
import { response_listmatch } from 'src/class/response_listmatch';
import { Round } from 'src/class/round';
import { CompetitionsService } from 'src/services/competitions.service';
import { ErrorService } from 'src/services/error.service';
import { GlobalService } from 'src/services/global.services';
import { MatchService } from 'src/services/match.service';
import { competitions_visu } from 'src/view-model/competitions_visu';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css']
})
export class CompetitionsComponent implements OnInit {
  action: string = "";
  visu: competitions_visu;
  loading: boolean = false;
  from: "SEASON" | "CATEGORY" | "TOURNAMENT" | "ROUND" = "SEASON";
  selected_sous_menu: "TOURNAMENT" | "ROUND" | "NO" = "NO";
  value: number;
  constructor(private route: ActivatedRoute, public globalserv: GlobalService, public _router: Router, public comp_serv: CompetitionsService, public mat_serv: MatchService) { }
  ngOnInit(): void {
    this.loading = true;
    this.visu = new competitions_visu();
    this.route.queryParams.subscribe(params => {
      if ('round' in params) {
        this.from = "ROUND";
        this.value = params['round'];
      } else if ('id' in params) {
        this.from = "TOURNAMENT";
        this.value = params['id'];
      } else if ('category' in params) {
        this.from = "CATEGORY";
        this.value = params['category'];
      } else if ('season' in params) {
        this.from = "SEASON";
        this.value = params['season'];
      } else {
        this.from = "SEASON";
        this.value = null;
      }

    });
    this.Load();
  }

  Load() {
    const errorService = ErrorService.instance;
    this.action = $localize`Charger les saisons`;
    this.comp_serv.GetSeasons().then((season) => {
      this.visu.season_list = season;
      switch (this.from) {
        default:
        case "SEASON":
          if (this.value != null) {
            //une saison en particulier
            this.visu.selSeason = this.visu.season_list.find(x => x.id == this.value).id;
            if (this.visu.selSeason == null) {
              this.visu.selSeason = this.visu.season_list.find(x => x.iscurrent == 1).id;
            }
          } else if (this.value == null) {
            //saison en cours
            this.visu.selSeason = this.visu.season_list.find(x => x.iscurrent == 1).id;
          }
          this.action = $localize`Charger les catégories`;
          //on charge les catégories
          this.comp_serv.GetAllCategories(this.visu.selSeason).then((categoris) => {
            this.visu.category_list = categoris;
          }).catch((err) => {
            let o = errorService.CreateError(this.action, err.message);
            errorService.emitChange(o);
          });
          break;
        case "CATEGORY":
          this.action = $localize`Charger les tournois`;
          // la saison peut être récupérée avec le saison_id des tournois.
          this.comp_serv.GetAllTournament(this.value).then((tournois) => {
            this.visu.tournament_list = tournois;
            this.visu.selSeason = tournois[0].season_id;
            this.action = $localize`Charger les catégories`;
            //on charge les catégories
            this.comp_serv.GetAllCategories(this.visu.selSeason).then((categoris) => {
              this.visu.category_list = categoris;
              this.visu.selCategory = this.value;
            }).catch((err) => {
              let o = errorService.CreateError(this.action, err.message);
              errorService.emitChange(o);
            });
          }).catch((err) => {
            let o = errorService.CreateError(this.action, err.message);
            errorService.emitChange(o);
          });
          break;
        case "TOURNAMENT":
          this.action = $localize`Charger les tours`;
          // la saison peut être récupérée avec le saison_id des tournois.
          this.comp_serv.GetAllRound(this.value).then((round) => {
            this.visu.round_list = round;
            this.action = $localize`Charger les tournois`;
            //on charge les catégories
            this.comp_serv.GetTournament(this.value).then((trn) => {
              this.visu.thisTournament = trn;
              this.visu.selSeason = trn.season_id;
              this.action = $localize`Charger les catégories`;
              //on charge les catégories
              this.comp_serv.GetAllCategories(this.visu.selSeason).then((categoris) => {
                this.visu.category_list = categoris;
                this.visu.selCategory = round[0].agecategoryid;
                this.action = $localize`Charger les tournois`;
                this.comp_serv.GetAllTournament(this.visu.selCategory).then((tournois) => {
                  this.visu.tournament_list = tournois;
                  this.visu.selTournament = this.value;
                  this.selected_sous_menu = "TOURNAMENT";
                }).catch((err) => {
                  let o = errorService.CreateError(this.action, err.message);
                  errorService.emitChange(o);
                });
              }).catch((err) => {
                let o = errorService.CreateError(this.action, err.message);
                errorService.emitChange(o);
              });
            }).catch((err) => {
              let o = errorService.CreateError(this.action, err.message);
              errorService.emitChange(o);
            });
          }).catch((err) => {
            let o = errorService.CreateError(this.action, err.message);
            errorService.emitChange(o);
          });
          break;
        case "ROUND":
          this.action = $localize`Charger le tours`;
          // la saison peut être récupérée avec le saison_id des tournois.
          this.comp_serv.GetRound(this.value).then((round) => {
            this.visu.selRound = round.id;
            this.visu.thisRound = round;
            this.action = $localize`Charger les tournois`;
            //on charge les catégories
            this.comp_serv.GetAllTournament(round.agecategoryid).then((tournois) => {
              this.visu.tournament_list = tournois;
              this.visu.selTournament = round.tournament_id;
              this.visu.selSeason = round.season_id;
              this.action = $localize`Charger les catégories`;
              //on charge les catégories
              this.comp_serv.GetAllCategories(this.visu.selSeason).then((categoris) => {
                this.visu.category_list = categoris;
                this.visu.selCategory = round.agecategoryid;
                this.action = $localize`Charger les tours`;
                this.comp_serv.GetAllRound(round.tournament_id).then((rounds) => {
                  this.visu.round_list = rounds;
                  this.visu.selRound = this.value;
                  this.selected_sous_menu = "ROUND";
                }).catch((err) => {
                  let o = errorService.CreateError(this.action, err.message);
                  errorService.emitChange(o);
                });
              }).catch((err) => {
                let o = errorService.CreateError(this.action, err.message);
                errorService.emitChange(o);
              });
            }).catch((err) => {
              let o = errorService.CreateError(this.action, err.message);
              errorService.emitChange(o);
            });
          }).catch((err) => {
            let o = errorService.CreateError(this.action, err.message);
            errorService.emitChange(o);
          });
          break;
      }
    }).catch((err) => {
      let o = errorService.CreateError(this.action, err.message);
      errorService.emitChange(o);
    });

    this.loading = false;
  }

  onSelSeasonChange(newSeason: any) {
    const errorService = ErrorService.instance;
    this.action = $localize`Changer de saison`;
    this.visu.selCategory = null;
    this.visu.selRound = null;
    this.visu.selTournament = null;
    this.visu.thisCategory = null;
    this.visu.thisRound = null;
    this.visu.thisTournament = null;
    this.visu.thisSeason = this.visu.season_list.find(x => x.id == newSeason);
    this.visu.selSeason = newSeason;
    this.visu.round_list = null;
    this.visu.tournament_list = null;
    this.comp_serv.GetAllCategories(this.visu.selSeason).then((categoris) => {
      this.visu.category_list = categoris;
    }).catch((err) => {
      let o = errorService.CreateError(this.action, err.message);
      errorService.emitChange(o);
    });
    // Ajoutez ici le code que vous souhaitez exécuter lorsque la saison change
  }
  onSelCategoryChange(newSeason: any) {
    const errorService = ErrorService.instance;
    this.action = $localize`Changer de catégorie`;
    this.visu.selRound = null;
    this.visu.selTournament = null;
    this.visu.thisRound = null;
    this.visu.thisTournament = null;
    this.visu.selCategory = newSeason;
    this.visu.round_list = null;
    this.visu.thisCategory = this.visu.category_list.find(x => x.id == newSeason);
    this.comp_serv.GetAllTournament(newSeason).then((tournaments) => {
      this.visu.tournament_list = tournaments;
    }).catch((err) => {
      let o = errorService.CreateError(this.action, err.message);
      errorService.emitChange(o);
    });
    // Ajoutez ici le code que vous souhaitez exécuter lorsque la saison change
  }
  onSelTournamentChange(newSeason: any) {
    const errorService = ErrorService.instance;
    this.action = $localize`Changer de compétition`;
    this.visu.selRound = null;
    this.visu.thisRound = null;
    this.visu.selTournament = newSeason;
    this.selected_sous_menu = "TOURNAMENT";
    this.visu.thisTournament = this.visu.tournament_list.find(x => x.id == newSeason);
    this.LoadTournament();
    this.comp_serv.GetAllRound(newSeason).then((rounds) => {
      this.visu.round_list = rounds;
    }).catch((err) => {
      let o = errorService.CreateError(this.action, err.message);
      errorService.emitChange(o);
    });
    // Ajoutez ici le code que vous souhaitez exécuter lorsque la saison change
  }
  onSelRoundChange(newSeason: any) {
    const errorService = ErrorService.instance;
    this.action = $localize`Changer de tour`;
    this.visu.selRound = newSeason;
    this.comp_serv.GetRound(newSeason).then((rd) => {
      this.visu.thisRound = rd;
      this.selected_sous_menu = "ROUND";
      this.LoadRound();
    }).catch((err) => {
      let o = errorService.CreateError(this.action, err.message);
      errorService.emitChange(o);
    });
    // Ajoutez ici le code que vous souhaitez exécuter lorsque la saison change
  }

  RemoveCategory() {
    this.visu.selCategory = null;
    this.visu.tournament_list = null;
    this.visu.selTournament = null;
    this.visu.selRound = null;
    this.visu.round_list = null;
    this.visu.thisCategory = null;
    this.visu.thisTournament = null;
    this.visu.thisRound = null;
    this.selected_sous_menu = "NO";
  }
  RemoveTournament() {
    this.visu.selTournament = null;
    this.visu.selRound = null;
    this.visu.thisTournament = null;
    this.visu.thisRound = null;
    this.visu.round_list = null;
    this.selected_sous_menu = "NO";
  }
  RemoveRound() {
    this.visu.selRound = null;
    this.visu.thisRound = null;
    this.selected_sous_menu = "TOURNAMENT";
  }
  LoadTournament() {
    const errorService = ErrorService.instance;
    this.action = $localize`Charger les matchs`;
    this.mat_serv.GetAllMatchTournament(this.visu.selTournament).then((reponse: response_listmatch) => {
      reponse.list_match.forEach(m => {
        m.team_home_logo = reponse.list_logo.filter(x => x.id == m.club_home_id)[0].logo;
        m.team_away_logo = reponse.list_logo.filter(x => x.id == m.club_away_id)[0].logo;
        m.sporthall = reponse.list_sporthall.filter(x => x.id == m.sporthall_id)[0];
      })
      this.visu.thisTournament.game_lists = reponse.list_match;
      this.visu.thisTournament.date_list = new Array<Date>();
      this.visu.thisTournament.game_lists.forEach(element => {
        if (!(this.visu.thisTournament.date_list.find(e => e == element.date))) {
          this.visu.thisTournament.date_list.push(element.date);
        }
      });
      this.visu.thisTournament.date_list.sort(function (a, b) {
        return a < b ? 1 : -1;
      });
      this.visu.thisTournament.game_lists.sort(
        function (a, b) {
          return a.time > b.time ? 1 : -1;
        }
      );
      this.action = $localize`Charger les gardiens`;
      this.comp_serv.GetGoalie(this.visu.selTournament).then((goalie) => {
        this.visu.thisTournament.ranking_goalies_list = goalie;
        this.visu.thisTournament.ranking_goalies_list.forEach(m => {
          if(reponse.list_logo.some(x => x.id === m.clubid)){
            m.team_logo = reponse.list_logo.find(x => x.id === m.clubid).logo;
          }
          if(reponse.list_match.some(x => x.team_home_id == m.teamid)){
            m.team_name = reponse.list_match.find(x => x.team_home_id == m.teamid).team_home_name;
          } else if(reponse.list_match.some(x => x.team_away_id == m.teamid)){
            m.team_name = reponse.list_match.find(x => x.team_away_id == m.teamid).team_away_name;
          }
        })
        this.visu.thisTournament.ranking_goalies_list.sort((a, b) => a.percentage > b.percentage ? -1 : a.percentage < b.percentage ? 1 : 0);
        this.action = $localize`Charger les joueurs`;
        this.comp_serv.GetScorer(this.visu.selTournament).then((players) => {
          this.visu.thisTournament.ranking_points_list = players;
          this.visu.thisTournament.ranking_points_list.forEach(m => {
            m.points = Number(m.goals) + Number(m.assists);       
            if(reponse.list_match.some(x => x.team_home_id == m.team_id)){
              m.clubid = reponse.list_match.find(x => x.team_home_id == m.team_id).club_home_id;
              m.team_name = reponse.list_match.find(x => x.team_home_id == m.team_id).team_home_name;
            } else if(reponse.list_match.some(x => x.team_away_id == m.team_id)){
              m.clubid = reponse.list_match.find(x => x.team_home_id == m.team_id).club_away_id;
              m.team_name = reponse.list_match.find(x => x.team_away_id == m.team_id).team_away_name;
            }
            if(reponse.list_logo.some(x => x.id === m.clubid)){
              m.team_logo = reponse.list_logo.find(x => x.id === m.clubid).logo;
            }
          })
          this.visu.thisTournament.ranking_points_list.sort((a, b) => a.points > b.points ? -1 : a.points < b.points ? 1 : 0);
          this.action = $localize`Charger le palmares`;
          this.comp_serv.GetPrizelist(this.visu.selTournament).then((palmares) => {
            this.visu.thisTournament.prizelist = palmares;  
          }).catch((err) => {
            let o = errorService.CreateError(this.action, err.message);
            errorService.emitChange(o);
          });
        }).catch((err) => {
          let o = errorService.CreateError(this.action, err.message);
          errorService.emitChange(o);
        });
      }).catch((err) => {
        let o = errorService.CreateError(this.action, err.message);
        errorService.emitChange(o);
      });
    }).catch((err) => {
      let o = errorService.CreateError(this.action, err.message);
      errorService.emitChange(o);
    });
  }
  LoadRound() {
    const errorService = ErrorService.instance;
    this.action = $localize`Charger les matchs`;
    this.mat_serv.GetAllMatchRound(this.visu.selRound).then((reponse: response_listmatch) => {
      reponse.list_match.forEach(m => {
        m.team_home_logo = reponse.list_logo.filter(x => x.id == m.club_home_id)[0].logo;
        m.team_away_logo = reponse.list_logo.filter(x => x.id == m.club_away_id)[0].logo;
        m.sporthall = reponse.list_sporthall.filter(x => x.id == m.sporthall_id)[0];
      })
      this.visu.thisRound.game_lists = reponse.list_match;
      this.visu.thisRound.date_list = new Array<Date>();
      this.visu.thisRound.game_lists.forEach(element => {
        if (!(this.visu.thisRound.date_list.find(e => e == element.date))) {
          this.visu.thisRound.date_list.push(element.date);
        }
      });
      this.visu.thisRound.date_list.sort(function (a, b) {
        return a < b ? 1 : -1;
      });
      this.visu.thisRound.game_lists.sort(
        function (a, b) {
          return a.time > b.time ? 1 : -1;
        }
      );
      this.action = $localize`Charger les gardiens`;
      this.comp_serv.GetGoalieRound(this.visu.selRound).then((goalie) => {
        this.visu.thisRound.ranking_goalies_list = goalie;
        this.visu.thisRound.ranking_goalies_list.forEach(m => {
          if(reponse.list_logo.some(x => x.id === m.clubid)){
            m.team_logo = reponse.list_logo.find(x => x.id === m.clubid).logo;
          }
          if(reponse.list_match.some(x => x.team_home_id == m.teamid)){
            m.team_name = reponse.list_match.find(x => x.team_home_id == m.teamid).team_home_name;
          } else if(reponse.list_match.some(x => x.team_away_id == m.teamid)){
            m.team_name = reponse.list_match.find(x => x.team_away_id == m.teamid).team_away_name;
          }
        })
        this.visu.thisRound.ranking_goalies_list.sort((a, b) => a.percentage > b.percentage ? -1 : a.percentage < b.percentage ? 1 : 0);
        this.action = $localize`Charger les joueurs`;
        this.comp_serv.GetScorerRound(this.visu.selRound).then((players) => {
          this.visu.thisRound.ranking_points_list = players;
          this.visu.thisRound.ranking_points_list.forEach(m => {
            m.points = Number(m.goals) + Number(m.assists);       
            if(reponse.list_match.some(x => x.team_home_id == m.team_id)){
              m.clubid = reponse.list_match.find(x => x.team_home_id == m.team_id).club_home_id;
              m.team_name = reponse.list_match.find(x => x.team_home_id == m.team_id).team_home_name;
            } else if(reponse.list_match.some(x => x.team_away_id == m.team_id)){
              m.clubid = reponse.list_match.find(x => x.team_home_id == m.team_id).club_away_id;
              m.team_name = reponse.list_match.find(x => x.team_away_id == m.team_id).team_away_name;
            }
            if(reponse.list_logo.some(x => x.id === m.clubid)){
              m.team_logo = reponse.list_logo.find(x => x.id === m.clubid).logo;
            }
          })
          this.visu.thisRound.ranking_points_list.sort((a, b) => a.points > b.points ? -1 : a.points < b.points ? 1 : 0);
          if(this.visu.thisRound.type == 2){
            this.action = $localize`Charger le classement`;
            this.comp_serv.GetRanking(this.visu.selRound).then((st) =>{
              this.visu.thisRound.ranking_team = st;
              this.visu.thisRound.ranking_team.forEach(m => {
                if(this.visu.thisRound.game_lists.some(x => x.team_home_id === m.team_id)){
                  m.team_logo = this.visu.thisRound.game_lists.find(x => x.team_home_id === m.team_id).team_home_logo;
                }
                if(this.visu.thisRound.game_lists.some(x => x.team_away_id === m.team_id)){
                  m.team_logo = this.visu.thisRound.game_lists.find(x => x.team_away_id === m.team_id).team_away_logo;
                }
              });
              this.visu.thisRound.is_nul = this.visu.thisRound.ranking_team.some(x => x.DRAW > 0);
              this.visu.thisRound.is_fft = this.visu.thisRound.ranking_team.some(x => x.FORFEIT > 0);
              this.visu.thisRound.is_ot = this.visu.thisRound.ranking_team.some(x => x.OT_WIN > 0) || this.visu.thisRound.ranking_team.some(x => x.OT_LOST > 0);
              //is ot is nul
            }).catch((err) => {
              let o = errorService.CreateError(this.action, err.message);
              errorService.emitChange(o);
            });
          }          
        }).catch((err) => {
          let o = errorService.CreateError(this.action, err.message);
          errorService.emitChange(o);
        });
      }).catch((err) => {
        let o = errorService.CreateError(this.action, err.message);
        errorService.emitChange(o);
      });
    }).catch((err) => {
      let o = errorService.CreateError(this.action, err.message);
      errorService.emitChange(o);
    });
  }
}