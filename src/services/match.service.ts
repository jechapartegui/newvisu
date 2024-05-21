import { Injectable } from '@angular/core';
import { detailed_score } from 'src/class/detailed_score';
import { full_game } from 'src/class/full_game';
import { game_events } from 'src/class/game_events';
import { officials } from 'src/class/official';
import { player_game } from 'src/class/player_game_detail';
import { referee } from 'src/class/referee';
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
  GetAllMatchTournament(id:number, federation:boolean = false):Promise<response_listmatch>{
    this.url = environment.url + 'public_mt_matchs_getlist.php';
    //  this.url = this.url + "login.php";
    const body = {
     command:"tournament",
     federation:federation,
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
  GetAllMatchRound(id:number):Promise<response_listmatch>{
    this.url = environment.url + 'public_mt_matchs_getlist.php';
    //  this.url = this.url + "login.php";
    const body = {
     command:"round",
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

  GetAll():Promise<response_listmatch>{
    this.url = environment.url + 'public_mt_matchs_getlist.php';
    //  this.url = this.url + "login.php";
    const body = {
     federation:true,
     command:"all"
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

  get_match(id: number): Promise<full_game> {
    this.url = environment.url + 'public_mt_match_get.php';
    //  this.url = this.url + "login.php";
    const body = {
      id: id, 
      command: "match", 
      old: true
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

  // players of the game
  get_player_match(id: number): Promise<player_game[]> {
    this.url = environment.url + 'public_mt_match_get.php';
    //  this.url = this.url + "login.php";
    const body = {
      id: id,command: "player", old: true
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

  // officials of the game
  get_official(id: number): Promise<officials[]> {
    this.url = environment.url + 'public_mt_match_get.php';
    //  this.url = this.url + "login.php";
    const body = {
      id: id, command: "official",old: true
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

  // referees of the game
  get_referee(id: number): Promise<referee[]> {
    this.url = environment.url + 'public_mt_match_get.php';
    //  this.url = this.url + "login.php";
    const body = {
      id: id,command: "referee", old: true
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
  // events of the game
  get_event(id: number): Promise<game_events[]> {
    this.url = environment.url + 'public_mt_match_get.php';
    //  this.url = this.url + "login.php";
    const body = {
      id: id,command: "event", old: true
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

  // score of the game
  get_score(id: number): Promise<detailed_score[]> {
    this.url = environment.url + 'public_mt_match_get.php';
    //  this.url = this.url + "login.php";
    const body = {
      id: id,command: "score"
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
