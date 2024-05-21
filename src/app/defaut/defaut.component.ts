import { Component, OnInit } from '@angular/core';
import { MatchService } from '../../services/match.service';
import { ErrorService } from 'src/services/error.service';
import { default_visu } from 'src/view-model/default_visu';
import { ActivatedRoute } from '@angular/router';
import { response_listmatch } from 'src/class/response_listmatch';
import { FilterTeamPipe } from 'src/filter/filter_team.pipe';

@Component({
  selector: 'app-defaut',
  templateUrl: './defaut.component.html',
  styleUrls: ['./defaut.component.css']
})
export class DefautComponent implements OnInit {
  selected_sous_menu: "LIVE" | "TERMINE" | "TOUS" | "PROCHAIN" = "TERMINE";
  action: string = "";
  visu: default_visu
  filtred:boolean=false;
  loading:boolean=false;
  constructor(private matchservice: MatchService, private _Activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.visu = new default_visu();
    this.LoadMatchLive(true);
    this.LoadMatchTermine();
    this.LoadMatchToPlay();
  }

  Relaoad(){
    this.LoadMatchLive();
    this.LoadMatchTermine();
    this.LoadMatchToPlay();
  }

  LoadMatchLive(select_if_game:boolean=false) {
    const errorService = ErrorService.instance;
    this.action = $localize`Charger les matchs en cours`;
    this.matchservice.GetCurrentMatch().then((list_matchs : response_listmatch) => {
      if (list_matchs) {
        this.visu.load_live_games(list_matchs);
        if(select_if_game && list_matchs.list_match.length>0){
          this.selected_sous_menu = "LIVE";
        }
      } else {
        let o = errorService.CreateError(this.action, $localize`Erreur inconnue`);
        errorService.emitChange(o);
      }
    }).catch((err) => {
      let o = errorService.CreateError(this.action, err.message);
      errorService.emitChange(o);
    });
  }

  LoadMatchTermine() {
    const errorService = ErrorService.instance;
    this.action = $localize`Charger les matchs déjà terminés`;
    this.matchservice.GetPlayedMatch().then((list_matchs: response_listmatch) => {
      if (list_matchs) {
        this.visu.load_games_played(list_matchs);
      } else {
        let o = errorService.CreateError(this.action, $localize`Erreur inconnue`);
        errorService.emitChange(o);
      }
    }).catch((err) => {
      let o = errorService.CreateError(this.action, err.message);
      errorService.emitChange(o);
    });
  }

  LoadMatchToPlay() {
    const errorService = ErrorService.instance;
    this.action = $localize`Charger les matchs à jouer`;
    this.matchservice.GetNextMatch().then((list_matchs: response_listmatch) => {
      if (list_matchs) {
        this.visu.load_games_to_come(list_matchs);
      } else {
        let o = errorService.CreateError(this.action, $localize`Erreur inconnue`);
        errorService.emitChange(o);
      }
    }).catch((err) => {
      let o = errorService.CreateError(this.action, err.message);
      errorService.emitChange(o);
    });
  }

  Filtrer(){    
      const errorService = ErrorService.instance;
      this.action = $localize`Charger les matchs à jouer`;
      this.loading = true;
      this.filtred = true;
      this.matchservice.GetAllMatchTournament(this.visu.SelTournament, true).then((list_matchs: response_listmatch) => {
        if (list_matchs) {
          this.visu.load_all_games(list_matchs);
          this.loading = false;
        } else {
          let o = errorService.CreateError(this.action, $localize`Erreur inconnue`);
          errorService.emitChange(o);
        }
      }).catch((err) => {
        let o = errorService.CreateError(this.action, err.message);
        errorService.emitChange(o);
      });
  }

  LoadAll(){
    const errorService = ErrorService.instance;
    this.action = $localize`Charger les matchs à jouer`;
    this.loading = true;
    this.filtred = false;
    this.matchservice.GetAll().then((list_matchs: response_listmatch) => {
      if (list_matchs) {
        this.visu.load_all_games(list_matchs);
        this.loading = false;
      } else {
        let o = errorService.CreateError(this.action, $localize`Erreur inconnue`);
        errorService.emitChange(o);
      }
    }).catch((err) => {
      let o = errorService.CreateError(this.action, err.message);
      errorService.emitChange(o);
    });
  }


}
