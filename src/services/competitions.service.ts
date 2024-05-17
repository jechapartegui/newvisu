import { Injectable } from '@angular/core';
import { GlobalService } from './global.services';
import { season } from 'src/class/season';
import { environment } from 'src/environments/environment.prod';
import { categories } from 'src/class/category';
import { Tournament } from 'src/class/tournament';
import { Round } from 'src/class/round';

@Injectable({
  providedIn: 'root'
})
export class CompetitionsService {

  url :string;
  constructor(public global: GlobalService) {}

  GetSeasons():Promise<season[]>{
    this.url = environment.url + 'public_season_getall.php';
    //  this.url = this.url + "login.php";
    const body = {
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
  GetAllCategories(id):Promise<categories[]>{
    this.url = environment.url + 'public_categories_getall.php';
    //  this.url = this.url + "login.php";
    const body = {
      seasonid:id
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

  GetAllTournament(id):Promise<Tournament[]>{
    this.url = environment.url + 'public_tournament_get.php';
   //  this.url = this.url + "login.php";
   const body = {
    agecategoryid:id,
    command:"getall"
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
GetAllRound(tournament_id):Promise<Round[]>{
  this.url = environment.url + 'public_round_get.php';
 //  this.url = this.url + "login.php";
 const body = {
  tournament_id:tournament_id,
  command:"getall"
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
