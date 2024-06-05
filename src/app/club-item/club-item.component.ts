import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { KeyValuePairDB } from 'src/class/kvp';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-club-item',
  templateUrl: './club-item.component.html',
  styleUrls: ['./club-item.component.css']
})
export class ClubItemComponent  {
  @Input() club:any;
  @Input() context : "RECHERCHE" | "MATCH" | "CLUB";  
  @Output() onChange = new EventEmitter<any>();
  url = environment.url;
  display_palm:boolean=false;
  display_jr:boolean=false;
  constructor(private router:Router){}
  GoToClub(id) {
    let kvp = { type : "CLUB", id : id};
    this.onChange.emit(kvp);
  }
  GoToTeam(id) {
    let kvp = { type : "EQUIPE", id : id};
    this.onChange.emit(kvp);
  }
  GoToClubLien(id) {
    this.router.navigate(['/clubs'], { queryParams: { id: id } });
  }
}
