import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { full_player } from 'src/class/full_player';
import { player_game } from 'src/class/player_game_detail';

@Component({
  selector: 'app-joueur-item',
  templateUrl: './joueur-item.component.html',
  styleUrls: ['./joueur-item.component.css']
})
export class JoueurItemComponent implements OnInit {
  @Input() joueur:full_player;
  @Input() joueur_game:player_game;
  @Input() context : "RECHERCHE" | "MATCH" | "CLUB";
  nb_but:number[] = [];
  nb_assist:number[] = [];
  nb_fault:number[] = [];
  constructor(private router:Router){}
  ngOnInit(): void {
      if(this.joueur_game){
        this.joueur = new full_player();
        this.joueur.firstname = this.joueur_game.firstname;
        this.joueur.lastname = this.joueur_game.lastname;
        this.joueur.number = this.joueur_game.number;
        this.joueur.statistics = new player_game();
        this.joueur.statistics = this.joueur_game;
        this.joueur.photo = this.joueur_game.photo;       
      }
      if(this.joueur.statistics){
        for (let i = 1; i <= this.joueur.statistics.goal; i++) {
          this.nb_but.push(i);
        }
        for (let i = 1; i <= this.joueur.statistics.assist; i++) {
          this.nb_assist.push(i);
        }
        for (let i = 1; i <= this.joueur.statistics.fault; i++) {
          this.nb_fault.push(i);
        }
        if(this.joueur.statistics.shots>0){
          this.joueur.statistics.pc_saves = this.joueur.statistics.saves / this.joueur.statistics.shots * 100
        }
      }
     
  }
  GoToJoueur(id:number){
    this.router.navigate(['/joueurs'], { queryParams: { id: id } });     
  }
}
