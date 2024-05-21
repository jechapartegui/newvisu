import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Tournament } from 'src/class/tournament';

@Component({
  selector: 'app-competition-item',
  templateUrl: './competition-item.component.html',
  styleUrls: ['./competition-item.component.css']
})
export class CompetitionItemComponent {
  @Input() competition:any;
  constructor(private router:Router){}
  GoToRound(id) {
    this.router.navigate(['/competitions'], { queryParams: { round: id } });
  }}
