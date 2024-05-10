import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { full_game } from 'src/class/full_game';
import { KeyValuePairDB } from 'src/class/kvp';

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
  @Input() display_date:boolean = false;
  @Input() display_competition:boolean = false;
  @Input() display_round:boolean = false;
  @Input() display_referee:boolean = false;
  @Input() display_sportshall:boolean=false;
  @Input() display_validation:boolean=false;
  


  ngOnInit(): void {
    // Pour chaque date dans la liste, créez un objet DateAvecBool avec la date et un booléen (à titre d'exemple, mettons tous les booléens à true)
    this.liste_date.forEach(date => {
      this.liste_objets.push(new KeyValuePairDB(date, true));
    });
  }
}
