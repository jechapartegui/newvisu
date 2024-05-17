import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { categories } from 'src/class/category';
import { CompetitionsService } from 'src/services/competitions.service';
import { ErrorService } from 'src/services/error.service';
import { GlobalService } from 'src/services/global.services';
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
  value: number;
  constructor(private route: ActivatedRoute, public globalserv: GlobalService, public _router: Router, public comp_serv: CompetitionsService) { }
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
            this.comp_serv.GetAllTournament(this.value).then((tournois) => {
              this.visu.tournament_list = tournois;
              this.visu.selTournament = this.value;
              this.visu.selSeason = tournois[0].season_id;
              this.action = $localize`Charger les catégories`;
              //on charge les catégories
              this.comp_serv.GetAllCategories(this.visu.selSeason).then((categoris) => {
                this.visu.category_list = categoris;
                this.visu.selCategory = round[0].agecategoryid;
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
          this.action = $localize`Charger les tours`;
          // la saison peut être récupérée avec le saison_id des tournois.
          this.comp_serv.GetAllRound(this.value).then((round) => {
            this.visu.round_list = round;
            this.action = $localize`Charger les tournois`;
            //on charge les catégories
            this.comp_serv.GetAllTournament(this.value).then((tournois) => {
              this.visu.tournament_list = tournois;
              this.visu.selTournament = this.value;
              this.visu.selSeason = tournois[0].season_id;
              this.action = $localize`Charger les catégories`;
              //on charge les catégories
              this.comp_serv.GetAllCategories(this.visu.selSeason).then((categoris) => {
                this.visu.category_list = categoris;
                this.visu.selCategory = round[0].agecategoryid;
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
}