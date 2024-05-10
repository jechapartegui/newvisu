import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-club-item',
  templateUrl: './club-item.component.html',
  styleUrls: ['./club-item.component.css']
})
export class ClubItemComponent  {
  @Input() club:any;
}
