import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-equipe-item',
  templateUrl: './equipe-item.component.html',
  styleUrls: ['./equipe-item.component.css']
})
export class EquipeItemComponent {
  @Input() equipe:any;}
