import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { prizelist } from 'src/class/prizelist';

@Component({
  selector: 'app-prizelist',
  templateUrl: './prizelist.component.html',
  styleUrls: ['./prizelist.component.css']
})
export class PrizelistComponent {
  @Input() prize_list:prizelist[];
}
