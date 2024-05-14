import { Component, Input } from '@angular/core';
import { teams } from 'src/class/team';

@Component({
  selector: 'app-equipe-item',
  templateUrl: './equipe-item.component.html',
  styleUrls: ['./equipe-item.component.css']
})
export class EquipeItemComponent {
  @Input() equipe:teams;}
