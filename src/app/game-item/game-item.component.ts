import { Component, Input, OnInit } from '@angular/core';
import { full_game } from 'src/class/full_game';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.css']
})
export class GameItemComponent implements OnInit {
  @Input() match: full_game
  @Input() federation: boolean = false;
  url = environment.url;
  constructor(private router: Router) { }
  ngOnInit(): void {


  }
  GoToMatch() {
    this.router.navigate(['/games'], { queryParams: { id: this.match.id } });
  }
  GoToRound(id) {
    this.router.navigate(['/competitions'], { queryParams: { round: id } });
  }
  GoToTournament(id) {
    this.router.navigate(['/competitions'], { queryParams: { id: id } });
  }
  GoToTeam(id) {
    this.router.navigate(['/clubs'], { queryParams: { team: id } });
  }
}
