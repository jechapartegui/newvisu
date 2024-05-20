import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tournament } from 'src/class/tournament';

@Component({
  selector: 'app-competition-detail',
  templateUrl: './competition-detail.component.html',
  styleUrls: ['./competition-detail.component.css']
})
export class CompetitionDetailComponent {
  @Input() thisTournament:Tournament;
  selected_sous_menu: "MATCH" | "GOALIE" | "SCORER" | "PRIZELIST"= "MATCH";
}
