import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-competition-item',
  templateUrl: './competition-item.component.html',
  styleUrls: ['./competition-item.component.css']
})
export class CompetitionItemComponent {
  @Input() competition:any;}
