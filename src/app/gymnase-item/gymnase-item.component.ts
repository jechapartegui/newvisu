import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gymnase-item',
  templateUrl: './gymnase-item.component.html',
  styleUrls: ['./gymnase-item.component.css']
})
export class GymnaseItemComponent {
  @Input() gymnase:any;}
