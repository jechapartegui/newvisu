import { Component, Input } from '@angular/core';
import { full_player } from 'src/class/full_player';

@Component({
  selector: 'app-joueur-item',
  templateUrl: './joueur-item.component.html',
  styleUrls: ['./joueur-item.component.css']
})
export class JoueurItemComponent {
  @Input() joueur:full_player;
}
