import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { teams } from 'src/class/team';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-equipe-item',
  templateUrl: './equipe-item.component.html',
  styleUrls: ['./equipe-item.component.css']
})
export class EquipeItemComponent {
  @Input() equipe:teams;
  @Input() context : "RECHERCHE" | "MATCH" | "CLUB";
  @Output() onChange = new EventEmitter<any>();
  url = environment.url;

  constructor(private router:Router){}
  GoToTeam(id) {
    this.router.navigate(['/clubs'], { queryParams: { team: id } });
  }
  GoToCategory(id) {
    this.router.navigate(['/competitions'], { queryParams: { category: id } });
  }
  GoToTeamLien(id){
    let kvp = { type : "EQUIPE", id : id};
    this.onChange.emit(kvp);
  }
  GoToClubLien(id){
    let kvp = { type : "CLUB", id : id};
    this.onChange.emit(kvp);
  }
}
