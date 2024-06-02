import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { full_season } from 'src/class/full_season';
import { Router } from '@angular/router';
import { season } from 'src/class/season';

@Component({
  selector: 'app-list-saison',
  templateUrl: './list-saison.component.html',
  styleUrls: ['./list-saison.component.css']
})
export class ListSaisonComponent implements OnInit {
  constructor(public router:Router){}
  @Input() seasons:full_season[];
  @Input() list:season[];
ngOnInit(): void {
    this.list.forEach((ss) =>{
      ss.nextseason = 1;
    })
}

  GoToClub(id) {
    this.router.navigate(['/clubs'], { queryParams: { id: id } });
  }
  GoToTeam(id) {
    this.router.navigate(['/clubs'], { queryParams: { team: id } });
  }
}
