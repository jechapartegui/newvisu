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
import { season } from 'src/class/season';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent implements OnInit {
  visu: club_visu;
  loading: boolean = false;
  action: string;
  season_id: number;
  season_id_club: number;
  season_name: string;
  from: "EQUIPE" | "SEASON" | "CLUB" = "SEASON";
  from_type: "EQUIPE" | "SEASON" = "SEASON";
  value: number;
  selected_menu: "TEAM" | "CLUB";
  selected_sous_menu: "MATCHS" | "JOUEURS" | "CLASSEMENT" | "PALMARES" | "BUTEUR" | "EQUIPES";
  constructor(private route: ActivatedRoute, private router: Router, private comp_serv: CompetitionsService, private match_serv: MatchService, private joueur_serv: JoueurService) { }
  ngOnInit(): void {
    this.loading = true;
    this.visu = new club_visu();
    this.route.queryParams.subscribe(params => {
      if ('id' in params) {
        this.from = "CLUB";
        this.value = params['id'];
        this.from_type = "EQUIPE";
      } else if ('team' in params) {
        this.from = "EQUIPE";
        this.value = params['team'];
        this.from_type = "EQUIPE";
      } else if ('season' in params) {
        this.from = "SEASON";
        this.value = params['season'];
        this.from_type = "SEASON";
      } else {
        this.from = "SEASON";
        this.value = null;
        this.from_type = "SEASON";
      }

    });
    this.Load();
  }

  Load() {
    const errorService = ErrorService.instance;
    switch (this.from) {
      case "EQUIPE":

      case "CLUB":
        this.action = $localize`Charger l'équipe`;
        this.comp_serv.GetTeam(this.value).then((equipe) => {

          this.visu.thisTeam = equipe;
          this.selected_menu = "TEAM";
          this.visu.thisClub = equipe.club;
          this.comp_serv.GetSeasonByClub(equipe.clubid).then((seasons) => {
            this.visu.thisClub.list_season = seasons;
            this.comp_serv.GetTeamsByClubBySeason(equipe.clubid, equipe.seasonid).then((tea) => {
              this.visu.thisClub.teams = tea;

              this.joueur_serv.GetAllPlayersClub(equipe.clubid, equipe.seasonid).then((pla_club) => {
                this.visu.thisClub.players = pla_club;
                this.comp_serv.GetPrizelist(equipe.clubid).then((pri) => {
                  this.visu.thisClub.prizelist = pri;

                  this.match_serv.GetAllMatchTeam(this.value).then((reponse: response_listmatch) => {
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
                    this.joueur_serv.GetAllPlayersTeam(this.value).then((players) => {
                      this.visu.thisTeam.players = players;
                      this.action = $localize`Charger les classements`;
                      this.comp_serv.GetRankingsTeam(this.value).then((list_rk) => {
                        if (list_rk.length > 0) {
                          this.visu.thisTeam.rounds_rk = [];
                          list_rk.forEach(element => {
                            this.comp_serv.GetRound(element[0].round_id).then((rd) => {
                              rd.ranking_team = element;
                              this.visu.thisTeam.rounds_rk.push(rd);

                            })

                          });
                        } else {
                          this.visu.thisTeam.ranking_team = null;
                          this.visu.thisTeam.rounds_rk = null;
                        }
                      })
                      this.selected_sous_menu = "JOUEURS";
                      console.log(this.visu.thisTeam.players);
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

      default:
      case "SEASON":
        this.action = $localize`Charger les clubs`;
        this.comp_serv.GetSeasons().then((list_season) => {
          this.visu.list_season = list_season;
          let season_id = this.visu.list_season.find(x => x.iscurrent == 1).id;
          this.season_name = this.visu.list_season.find(x => x.iscurrent == 1).name;
          try {
            if (this.value != null) {
              season_id = this.visu.list_season.find(x => x.id == this.value).id;
              this.season_name = this.visu.list_season.find(x => x.id == this.value).name;
            }
          } catch (error) {

          }

          this.comp_serv.GetAllClubs(season_id).then((list_club) => {
            this.visu.list_club = list_club;
            this.visu.list_club.sort((a, b) => {
              const nomA = a.name.toUpperCase(); // Ignore la casse lors du tri
              const nomB = b.name.toUpperCase();
              let comparaison = 0;
              if (nomA > nomB) {
                comparaison = 1;
              } else if (nomA < nomB) {
                comparaison = -1;
              }

              return comparaison; // Inverse pour le tri descendant
            });
            this.action = $localize`Charger les équipes`;
            this.comp_serv.GetAllTeams(season_id).then((list_team) => {
              this.visu.list_team = list_team;
              this.visu.list_club.forEach((club) => {
                club.teams = [];
                this.visu.list_team.forEach((eq) => {
                  if (eq.clubid == club.id) {
                    club.teams.push(eq);
                  }
                })
              })
              this.visu.list_team.sort((a, b) => {
                const nomA = a.name.toUpperCase(); // Ignore la casse lors du tri
                const nomB = b.name.toUpperCase();
                let comparaison = 0;
                if (nomA > nomB) {
                  comparaison = 1;
                } else if (nomA < nomB) {
                  comparaison = -1;
                }

                return comparaison; // Inverse pour le tri descendant
              });
              this.selected_menu = "CLUB";
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
  }

  ChangerSeason() {
    this.from = "SEASON";
    this.value = this.season_id;
    this.Load();
  }

  GoTo(event) {
    this.from = event.type;
    this.value = event.id;
    this.Load();

  }
}
