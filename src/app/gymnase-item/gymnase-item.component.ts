import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-gymnase-item',
  templateUrl: './gymnase-item.component.html',
  styleUrls: ['./gymnase-item.component.css']
})
export class GymnaseItemComponent {
  @Input() gymnase:any;
  url = environment.url;
  constructor(private router:Router){}
  GoToClub(id) {
    this.router.navigate(['/team'], { queryParams: { club: id } });
  }}
