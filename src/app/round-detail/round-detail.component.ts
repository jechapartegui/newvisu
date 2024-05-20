import { Component, Input } from '@angular/core';
import { Round } from 'src/class/round';

@Component({
  selector: 'app-round-detail',
  templateUrl: './round-detail.component.html',
  styleUrls: ['./round-detail.component.css']
})
export class RoundDetailComponent {
  @Input() thisRound:Round;
  selected_sous_menu: "MATCH" | "GOALIE" | "SCORER" | "RANKING" = "MATCH";
}
