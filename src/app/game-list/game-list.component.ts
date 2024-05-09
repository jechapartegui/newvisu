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

  ngOnInit(): void {
    console.log(this.liste_date);
    console.log(this.matchs);
    // Pour chaque date dans la liste, créez un objet DateAvecBool avec la date et un booléen (à titre d'exemple, mettons tous les booléens à true)
    this.liste_date.forEach(date => {
      this.liste_objets.push(new KeyValuePairDB(date, true));
    });
  }
}
