import { Injectable } from '@angular/core';
import { GlobalService } from './global.services';
import { full_player } from 'src/class/full_player';
import { environment } from 'src/environments/environment.prod';
import { teams } from 'src/class/team';
import { season } from 'src/class/season';
import { response_seasons } from 'src/class/response_seasons';
import { response_listmatch } from 'src/class/response_listmatch';
import { prizelist } from 'src/class/prizelist';

@Injectable({
  providedIn: 'root'
})
export class JoueurService {
  url: string;
  constructor(public global: GlobalService) { }

  GetAllPlayersTeam(id: number): Promise<full_player[]> {
    this.url = environment.url + 'public_players_get.php';
    //  this.url = this.url + "login.php";
    const body = {
      command: "team",
      id: id
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

  GetAllPlayersClub(id: number, saison: number): Promise<full_player[]> {
    this.url = environment.url + 'public_players_get.php';
    //  this.url = this.url + "login.php";
    const body = {
      command: "club",
      id: id,
      season: saison
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
  
  GetSeasons(id: number): Promise<response_seasons> {
    this.url = environment.url + 'public_players_get.php';
    //  this.url = this.url + "login.php";
    const body = {
      command: "season",
      id: id
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
  GetMatch(id: number): Promise<response_listmatch> {
    this.url = environment.url + 'public_players_get.php';
    //  this.url = this.url + "login.php";
    const body = {
      command: "match",
      id: id
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
  GetPrizelist(id: number): Promise<prizelist[]> {
    this.url = environment.url + 'public_prizelist_get.php';
    //  this.url = this.url + "login.php";
    const body = {
      command:"getall_player",
      player:id
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
  Get(id: number): Promise<full_player> {
    this.url = environment.url + 'public_players_get.php';
    //  this.url = this.url + "login.php";
    const body = {
      command: "get",
      id: id
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
