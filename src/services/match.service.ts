import { Injectable } from '@angular/core';
import { response_listmatch } from 'src/class/response_listmatch';
import { environment } from 'src/environments/environment.prod';
import { GlobalService } from 'src/services/global.services';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  url :string;
  constructor(public global: GlobalService) {}

  GetCurrentMatch():Promise<response_listmatch>{
    this.url = environment.url + 'public_mt_matchs_getlist.php';
    //  this.url = this.url + "login.php";
    const body = {
     command:"live"
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
  GetNextMatch():Promise<response_listmatch>{
    this.url = environment.url + 'public_mt_matchs_getlist.php';
    //  this.url = this.url + "login.php";
    const body = {
     command:"next"
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
  GetPlayedMatch():Promise<response_listmatch>{
    this.url = environment.url + 'public_mt_matchs_getlist.php';
    //  this.url = this.url + "login.php";
    const body = {
     command:"played"
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
