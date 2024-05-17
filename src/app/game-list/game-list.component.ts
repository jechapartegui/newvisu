import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { full_game } from 'src/class/full_game';
import { KeyValuePairDB } from 'src/class/kvp';
import { MatchService } from 'src/services/match.service';
import { gameslist_visu } from 'src/class/gameslist_visu';
import { games_visu } from 'src/view-model/games_visu';
import { response_listmatch } from 'src/class/response_listmatch';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit {
  @Input() matchs:full_game[];
  @Input() liste_date:Date[];
  liste_objets: KeyValuePairDB[] = [];
  group_by:"DATE" | "NO" | "SEASON" | "COMPETITION"= "DATE";
  @Input() federation:boolean = false;

 


  ngOnInit(): void {
    // Pour chaque date dans la liste, créez un objet DateAvecBool avec la date et un booléen (à titre d'exemple, mettons tous les booléens à true)
    this.liste_date.forEach(date => {
      this.liste_objets.push(new KeyValuePairDB(date, true));
    });
  }

  GetGameMatch(dategame: Date): boolean {
    return this.matchs.some(match => match.date === dategame);
  }
  
  
}
