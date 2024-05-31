import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { full_season } from 'src/class/full_season';

@Component({
  selector: 'app-list-saison',
  templateUrl: './list-saison.component.html',
  styleUrls: ['./list-saison.component.css']
})
export class ListSaisonComponent {
  
  @Input() seasons:full_season[];
}
