import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { prizelist } from 'src/class/prizelist';

@Component({
  selector: 'app-prizelist',
  templateUrl: './prizelist.component.html',
  styleUrls: ['./prizelist.component.css']
})
export class PrizelistComponent implements OnInit  {
  @Input() prize_list:prizelist[];
  @Input() context : "PLAYER" | "CLUB" | "TOURNAMENT" = "PLAYER";
  ngOnInit(): void {
      this.prize_list.sort((a,b) =>{
        const nomA = a.weight; // Ignore la casse lors du tri
        const nomB = b.weight;
        let comparaison = 0;
        if (nomA > nomB) {
          comparaison = 1;
        } else if (nomA < nomB) {
          comparaison = -1;
        }

        return  comparaison // Inverse pour le tri descendant
      })
  }
}
