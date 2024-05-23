import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-club-item',
  templateUrl: './club-item.component.html',
  styleUrls: ['./club-item.component.css']
})
export class ClubItemComponent  {
  @Input() club:any;
  @Input() context : "RECHERCHE" | "MATCH" | "CLUB";
  url = environment.url;

  constructor(private router:Router){}
  GoToClub(id) {
    this.router.navigate(['/clubs'], { queryParams: { id: id } });
  }
}
