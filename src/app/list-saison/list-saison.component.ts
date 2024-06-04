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
   visgo:boolean=false;
ngOnInit(): void {
    let huh = 0;
    this.seasons.forEach((sss)=>{
      huh += sss.player.goal_conceed;
    })
    if(huh ==0){
      this.visgo = false;
    } else {
      this.visgo = true;
    }
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
