import { Injectable } from '@angular/core';
import { GlobalService } from './global.services';
import { season } from 'src/class/season';
import { environment } from 'src/environments/environment.prod';
import { categories } from 'src/class/category';
import { Tournament } from 'src/class/tournament';
import { Round } from 'src/class/round';
import { ranking_player } from 'src/class/ranking_points';
import { prizelist } from 'src/class/prizelist';
import { teams_standings } from 'src/class/standings';
import { clubs } from 'src/class/club';
import { short_team, teams } from 'src/class/team';

@Injectable({
  providedIn: 'root'
})
export class CompetitionsService {

  url: string;
  constructor(public global: GlobalService) { }

  GetSeasons(): Promise<season[]> {
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
  GetAllCategories(id): Promise<categories[]> {
    this.url = environment.url + 'public_categories_getall.php';
    //  this.url = this.url + "login.php";
    const body = {
      seasonid: id
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
  GetTournament(id): Promise<Tournament> {
    this.url = environment.url + 'public_tournament_get.php';
    //  this.url = this.url + "login.php";
    const body = {
      id: id,
      command: "get"
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
  GetAllTournament(id): Promise<Tournament[]> {
    this.url = environment.url + 'public_tournament_get.php';
    //  this.url = this.url + "login.php";
    const body = {
      agecategoryid: id,
      command: "getall"
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
  GetAllRound(tournament_id): Promise<Round[]> {
    this.url = environment.url + 'public_round_get.php';
    //  this.url = this.url + "login.php";
    const body = {
      tournament_id: tournament_id,
      command: "getall"
    };


    return this.global.POST(this.url, body)
      .then((response: Round[]) => {
        return response.filter((item: Round) => item.type.toString() !== "5");
      })
      .catch(error => {
        // Gestion de l'erreur
        return Promise.reject(error);
      });
  }
  GetRound(id): Promise<Round> {
    this.url = environment.url + 'public_round_get.php';
    //  this.url = this.url + "login.php";
    const body = {
      id: id,
      command: "get"
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
  GetGoalie(id): Promise<ranking_player[]> {
    this.url = environment.url + 'public_tournament_get.php';
    //  this.url = this.url + "login.php";
    const body = {
      id: id,
      command: "get_goalie"
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
  GetScorer(id): Promise<ranking_player[]> {
    this.url = environment.url + 'public_tournament_get.php';
    //  this.url = this.url + "login.php";
    const body = {
      id: id,
      command: "get_scorer"
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
  GetGoalieRound(id): Promise<ranking_player[]> {
    this.url = environment.url + 'public_round_get.php';
    //  this.url = this.url + "login.php";
    const body = {
      id: id,
      command: "get_goalie"
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
  GetScorerRound(id): Promise<ranking_player[]> {
    this.url = environment.url + 'public_round_get.php';
    //  this.url = this.url + "login.php";
    const body = {
      id: id,
      command: "get_scorer"
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
  GetPrizelist(id): Promise<prizelist[]> {
    this.url = environment.url + 'public_prizelist_get.php';
    //  this.url = this.url + "login.php";
    const body = {
      tournament: id,
      command: "getall_tournament"
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
  GetRanking(id): Promise<teams_standings[]> {
    this.url = environment.url + 'public_round_get.php';
    //  this.url = this.url + "login.php";
    const body = {
      id: id,
      command: "get_ranking"
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

  GetRankingsTeam(id): Promise<any[]> {
    this.url = environment.url + 'public_ranking_get.php';
    //  this.url = this.url + "login.php";
    const body = {
      command: "teams",
      id: id,
      object: "team"
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
  GetAllClubsSeason(id): Promise<clubs[]> {
    this.url = environment.url + 'public_clubs_getall.php';
    //  this.url = this.url + "login.php";
    const body = {
      seasonid: id
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
  GetAllClubs(): Promise<clubs[]> {
    this.url = environment.url + 'public_clubs_getall.php';
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
  GetAllTeams(id): Promise<teams[]> {
    this.url = environment.url + 'public_global_search.php';
    //  this.url = this.url + "login.php";
    const body = {
      idseason: id,
      search_type: "team",
      text: ""
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
  GetTeam(id): Promise<teams> {
    this.url = environment.url + 'public_teams_getinfo.php';
    //  this.url = this.url + "login.php";
    const body = {
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
  GetTeamsByClubBySeason(id:number, season_id:number):Promise<short_team[]>{
    this.url = environment.url + 'public_teams_byclubbyseason.php';
    //  this.url = this.url + "login.php";
    const body = {
      clubid:id,
      seasonid:season_id
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
  GetSeasonByClub(id:number):Promise<season[]>{
    this.url = environment.url + 'public_seasons_byclub.php';
    //  this.url = this.url + "login.php";
    const body = {
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
