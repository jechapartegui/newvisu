import { Component, Input, OnInit } from '@angular/core';
import { full_game } from 'src/class/full_game';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.css']
})
export class GameItemComponent implements OnInit {
@Input() match:full_game
@Input() federation:boolean = false;
constructor(private router:Router){}
ngOnInit(): void {
   

}
GoToMatch(){
  this.router.navigate(['/games'], { queryParams: { id: this.match.id } });     
}
GoToRound(id){
  this.router.navigate(['/round'], { queryParams: { id: id} });     
}
GoToTournament(id){
  this.router.navigate(['/tournament'], { queryParams: { id: id } });     
}
GoToTeam(id){
  this.router.navigate(['/team'], { queryParams: { id: id } });     
}
}
