import { Injectable } from '@angular/core';
import { GlobalService } from './global.services';
import { full_player } from 'src/class/full_player';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class JoueurService {
  url :string;
  constructor(public global: GlobalService) {}

  GetAllPlayersTeam(id:number):Promise<full_player[]>{
    this.url = environment.url + 'public_players_get.php';
    //  this.url = this.url + "login.php";
    const body = {
     command:"team",
     id:id
    };
    

    return this.global.POST(this.url, body)
      .then((response) => {
        return response;
      })
      .catch(error => {
        // Gestion de l'erreur
        return Promise.reject(error);
      });
  }
}
