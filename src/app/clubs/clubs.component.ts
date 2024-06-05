import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { club_visu, season_club } from 'src/view-model/club_visu';
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
  from_type: "EQUIPE" | "SEASON" | "CLUB" = "SEASON";
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
      } else if ('team' in params) {
        this.from = "EQUIPE";
        this.value = params['team'];
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

  LoadTeam(id: number) {
    const errorService = ErrorService.instance;
    this.visu.thisTeam = null;
    this.visu.list_saison_club.forEach((ss) => {
      ss.display = false;
      ss.list_team.forEach((t) => { 
        t.display = false;
        if (t.shortTeam.id == id) {
          ss.display = true;
          t.display = true;
          if (!t.data_loaded) {
            this.comp_serv.GetTeam(id).then((equipe) => {
              t.thisTeam = equipe;
              this.match_serv.GetAllMatchTeam(id).then((reponse: response_listmatch) => {
                reponse.list_match.forEach(m => {
                  m.team_home_logo = reponse.list_logo.filter(x => x.id == m.club_home_id)[0].logo;
                  m.team_away_logo = reponse.list_logo.filter(x => x.id == m.club_away_id)[0].logo;
                  m.sporthall = reponse.list_sporthall.filter(x => x.id == m.sporthall_id)[0];
                })
                t.thisTeam.games_list = reponse.list_match;
                t.thisTeam.date_list = new Array<Date>();
                t.thisTeam.games_list.forEach(element => {
                  if (!(t.thisTeam.date_list.find(e => e == element.date))) {
                    t.thisTeam.date_list.push(element.date);
                  }
                });
                t.thisTeam.date_list.sort(function (a, b) {
                  return a < b ? 1 : -1;
                });
                t.thisTeam.games_list.sort(
                  function (a, b) {
                    return a.time > b.time ? 1 : -1;
                  }
                );
                this.action = $localize`Charger les joueurs de l'équipe`;
                this.joueur_serv.GetAllPlayersTeam(id).then((players) => {
                  t.thisTeam.players = players;
                  this.action = $localize`Charger les classements`;
                  this.comp_serv.GetRankingsTeam(id).then((list_rk) => {
                    if (list_rk.length > 0) {
                      t.thisTeam.rounds_rk = [];
                      list_rk.forEach(element => {
                        this.comp_serv.GetRound(element[0].round_id).then((rd) => {
                          rd.ranking_team = element;
                          t.thisTeam.rounds_rk.push(rd);
                        })

                      });
                    } else {
                      t.thisTeam.ranking_team = null;
                      t.thisTeam.rounds_rk = null;
                    }
                    t.data_loaded = true;
                    this.visu.thisTeam = t.thisTeam;
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
          } else {
            this.visu.thisTeam = t.thisTeam;
          }
        }
      })

    })

  }

  Load() {
    const errorService = ErrorService.instance;
    switch (this.from) {
      case "EQUIPE":
        this.comp_serv.GetTeam(this.value).then((equipe) => {

          this.visu.thisTeam = equipe;
          this.selected_menu = "TEAM";
          this.visu.thisClub = equipe.club;
          this.visu.list_saison_club = [];
          this.comp_serv.GetSeasonByClub(this.visu.thisClub.id).then((seasons) => {
            this.visu.list_season = seasons;
            seasons.forEach((ss) => {
              this.comp_serv.GetTeamsByClubBySeason(this.visu.thisClub.id, ss.id).then((tea) => {
                this.visu.list_saison_club.push(new season_club(tea, ss));
              }).catch((err) => {
                let o = errorService.CreateError(this.action, err.message);
                errorService.emitChange(o);
              });
            });

            this.joueur_serv.GetAllPlayersClub(equipe.clubid, equipe.seasonid).then((pla_club) => {
              this.visu.thisClub.players = pla_club;
              this.comp_serv.GetPrizelistClub(equipe.clubid).then((pri) => {
                this.visu.thisClub.prizelist = pri;
                this.LoadTeam(this.value);
                this.selected_menu = "TEAM";
                this.selected_sous_menu = "JOUEURS";
                this.from_type = "CLUB";
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
      case "CLUB":
        this.action = $localize`Charger le club`;
        this.comp_serv.GetAllClubs().then((list_club) => {
          this.visu.thisClub = list_club.find(x => x.id == this.value);
          this.visu.list_saison_club = [];
          this.comp_serv.GetSeasonByClub(this.value).then((seasons) => {
            seasons.sort(function (a, b) {
              return a.id < b.id ? 1 : -1;
            });
            seasons.forEach((ss) => {
              this.comp_serv.GetTeamsByClubBySeason(this.value, ss.id).then((tea) => {
                this.visu.list_saison_club.push(new season_club(tea, ss));
              }).catch((err) => {
                let o = errorService.CreateError(this.action, err.message);
                errorService.emitChange(o);
              });
            });
            this.visu.thisClub.list_season = seasons;
            let this_saison = seasons.find(x => x.iscurrent == 1);
            if (this_saison == null) {
              this_saison = seasons.reduce((maxSeason, season) => (season.id > maxSeason.id ? season : maxSeason), seasons[0]);
            }


            this.joueur_serv.GetAllPlayersClub(this.value, this_saison.id).then((pla_club) => {
              this.visu.thisClub.players = pla_club;
              this.comp_serv.GetPrizelistClub(this.value).then((pri) => {
                this.visu.thisClub.prizelist = pri;
                this.selected_menu = "CLUB";
                this.selected_sous_menu = "JOUEURS";
                this.from_type = "CLUB";
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

          this.comp_serv.GetAllClubsSeason(season_id).then((list_club) => {
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
              this.from_type = "SEASON";
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

  GoToTeam(id) {
    this.from = "EQUIPE";
    this.value = id;
    this.Load();
  }

  GoTo(event) {
    this.from = event.type;
    this.value = event.id;
    this.Load();

  }
  ChangerSeasonClub() {
    const errorService = ErrorService.instance;
    this.action = $localize`Charger les équipes`;
    this.comp_serv.GetTeamsByClubBySeason(this.visu.thisClub.id, this.season_id_club).then((teamssss) => {
      this.visu.thisClub.teams = teamssss;
    }).catch((err) => {
      let o = errorService.CreateError(this.action, err.message);
      errorService.emitChange(o);
    });
  }
}
