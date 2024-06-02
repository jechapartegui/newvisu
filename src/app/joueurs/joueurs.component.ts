import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { full_player } from 'src/class/full_player';
import { JoueurService } from 'src/services/joueur.service';
import { season } from 'src/class/season';
import { player_visu } from 'src/view-model/player_visu';

@Component({
  selector: 'app-joueurs',
  templateUrl: './joueurs.component.html',
  styleUrls: ['./joueurs.component.css']
})
export class JoueursComponent implements OnInit {
  loading :boolean =false;
  visu: player_visu;
  selected_menu:"MATCH" | "SAISON" | "PALMARES";
  id:number;
  constructor(public route:ActivatedRoute, public router:Router, private joueur_serv:JoueurService){}
  ngOnInit(): void {
    this.loading = true;
    this.visu = new player_visu();
    this.route.queryParams.subscribe(params => {
      if ('id' in params) {
        this.id = params['id']
      }

    });
    this.LoadJoueur();
  }

  async LoadJoueur() {
    let _joueur = this.joueur_serv.Get(this.id);
    let _match = this.joueur_serv.GetMatch(this.id);
    let _season = this.joueur_serv.GetSeasons(this.id);
    let _palm = this.joueur_serv.GetPrizelist(this.id);
    await Promise.all([_joueur, _match,_season,_palm]).then(results => {
      this.visu.load_page_joueur(results[0], results[1], results[2], results[3]);
      this.loading = false;
      this.selected_menu = 'SAISON';
    });
  }
}

  
