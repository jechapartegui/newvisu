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
@Input() display_date:boolean = false;
@Input() display_competition:boolean = false;
@Input() display_round:boolean = false;
@Input() display_referee:boolean = false;
@Input() display_sportshall:boolean=false;
@Input() display_validation:boolean=false;
constructor(private router:Router){}
ngOnInit(): void {
   

}
GoToMatch(){
  this.router.navigate(['/games'], { queryParams: { id: this.match.id } });     
}
}
