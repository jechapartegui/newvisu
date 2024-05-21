import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { games_visu } from 'src/view-model/games_visu';
import { ErrorService } from 'src/services/error.service';
import { GlobalService } from 'src/services/global.services';
import { MatchService } from 'src/services/match.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  visu:games_visu;  
  id:number;
  loading:boolean = false;
  action:string=  $localize`Charger un match`;
  constructor(private route: ActivatedRoute, public match_serv : MatchService, public _router:Router) { }
  ngOnInit(): void {
    const errorService = ErrorService.instance;
    this.route.queryParams.subscribe(params => {
      if ('id' in params) {
        this.id = params['id'];
        this.loading = true;
        this.getMatch(this.id).then(() =>{
          this.loading = false;
          let o = errorService.OKMessage(this.action);
          errorService.emitChange(o);
        }).catch((err) => {
          let o = errorService.CreateError(this.action, err.message);
          errorService.emitChange(o);
        });
      } else {
        this._router.navigate(['/defaut']);
      }

    });
}
async getMatch(id: number) {
  let _game = this.match_serv.get_match(this.id);
  let _player = this.match_serv.get_player_match(this.id);
  let _offi = this.match_serv.get_official(this.id);
  let _ref = this.match_serv.get_referee(this.id);
  let _score = this.match_serv.get_score(this.id);
  let _event = this.match_serv.get_event(this.id);
  await Promise.all([_game, _player, _offi, _ref, _score,_event]).then(results => {
    this.visu = new games_visu(results[0],results[1],results[2],results[3],results[4],results[5]);
     });
}

GoToRound(id){
  this._router.navigate(['/round'], { queryParams: { id: id} });     
}
}
