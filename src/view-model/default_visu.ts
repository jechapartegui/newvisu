import { full_game } from "../class/full_game";
import { response_listmatch } from "../class/response_listmatch";
import { Round } from "../class/round";
import { search_global_result } from "../class/search_result";
import { sporthall } from "../class/sporthall";
import { teams } from "../class/team";
import { Tournament } from "../class/tournament";


export class default_visu {
  games_to_come: Array<full_game>;
  date_list: Array<Date>;
  games_played: Array<full_game>;
  date_list_games_played: Array<Date>;
  public TournamentSelected: Tournament;
  public all_games_filtered: Array<full_game>;
  SelRound: Round;
  SelTeam: teams;
  SelSportHall: sporthall;
  calendar: number = 0;
  all_games: Array<full_game>;
  date_list_all_games: Array<Date>;
  live_games: Array<full_game>;
  date_list_live_games: Array<Date>;
  activeindex: number;
  disabledlive: boolean;
  public list: string[] = [];

  public tournament_list: Array<Tournament>;
  public round_list: Array<Round>;
  public team_list: Array<teams>;
  public sporthall_list: Array<sporthall>;



  load_games_to_come(reponse: response_listmatch) {
    reponse.list_match.forEach(m => {
      m.team_home_logo = reponse.list_logo.filter(x => x.id == m.club_home_id)[0].logo;
      m.team_away_logo = reponse.list_logo.filter(x => x.id == m.club_away_id)[0].logo;
      m.sporthall = reponse.list_sporthall.filter(x => x.id == m.sporthall_id)[0];
    })
    this.games_to_come = reponse.list_match;
    this.date_list = new Array<Date>();
    this.games_to_come.forEach(element => {
      if (!(this.date_list.find(e => e == element.date))) {
        this.date_list.push(element.date);
      }
    });
    this.date_list.sort(function (a, b) {
      return a < b ? 1 : -1;
    });
    this.games_to_come.sort(
      function (a, b) {
        return a.time > b.time ? 1 : -1;
      }
    );
  }
  load_games_played(reponse: response_listmatch) {
    reponse.list_match.forEach(m => {
      m.team_home_logo = reponse.list_logo.filter(x => x.id == m.club_home_id)[0].logo;
      m.team_away_logo = reponse.list_logo.filter(x => x.id == m.club_away_id)[0].logo;
      m.sporthall = reponse.list_sporthall.filter(x => x.id == m.sporthall_id)[0];
    })
    this.games_played = reponse.list_match;
    this.date_list_games_played = new Array<Date>();
    this.games_played.forEach(element => {
      if (!(this.date_list_games_played.find(e => e == element.date))) {
        this.date_list_games_played.push(element.date);
      }
    });
    this.date_list_games_played.sort(function (a, b) {
      return a < b ? 1 : -1;
    });
    this.games_played.sort(
      function (a, b) {
        return a.time > b.time ? 1 : -1;
      }
    );
  }

  load_tournament(reponse: Array<Tournament>) {
    this.tournament_list = reponse;

  }


  load_all_games(reponse: response_listmatch, round_id = -1) {
    reponse.list_match.forEach(m => {
      m.team_home_logo = reponse.list_logo.filter(x => x.id == m.club_home_id)[0].logo;
      m.team_away_logo = reponse.list_logo.filter(x => x.id == m.club_away_id)[0].logo;
      m.sporthall = reponse.list_sporthall.filter(x => x.id == m.sporthall_id)[0];
    })
    this.all_games = reponse.list_match;
    this.all_games_filtered = reponse.list_match
    this.round_list = [];
    this.sporthall_list = [];
    this.team_list = [];
    this.all_games.forEach((gg) => {
      if (!this.round_list.find(x => x.id == gg.round_id)) {
        let trd = new Round();
        trd.id = gg.round_id;
        trd.name = gg.round_name;
        this.round_list.push(trd);
      }
      if (!this.team_list.find(x => x.id == gg.team_home_id)) {
        let tte = new teams();
        tte.id = gg.team_home_id;
        tte.name = gg.team_home_name;
        tte.logoclub = gg.team_home_logo;
        this.team_list.push(tte);
      }
      if (!this.team_list.find(x => x.id == gg.team_away_id)) {
        let ttea = new teams();
        ttea.id = gg.team_away_id;
        ttea.name = gg.team_away_name;
        ttea.logoclub = gg.team_away_logo;
        this.team_list.push(ttea);
      }
      if (!this.sporthall_list.find(x => x.id == gg.sporthall_id)) {
        let sph = new sporthall();
        sph.id = gg.sporthall_id;
        sph.name = gg.sporthall.name;
        sph.city = gg.sporthall.city;
        this.sporthall_list.push(sph);
      }
    })

    if (round_id > 0) {
      this.SelRound = this.round_list.find(x => x.id == round_id);
    }

    this.filter_games();

  }

  filter_games() {
    this.all_games_filtered = this.all_games;
    if (this.SelRound) {
      let tmp_list = this.all_games.filter(x => x.round_id == this.SelRound.id);
      this.all_games_filtered = tmp_list;
    }
    if (this.SelTeam) {
      let tmp_list = this.all_games_filtered.filter(x => (x.team_away_id == this.SelTeam.id) || (x.team_home_id == this.SelTeam.id));
      this.all_games_filtered = tmp_list;
    }
    if (this.SelSportHall) {
      let tmp_list = this.all_games_filtered.filter(x => x.sporthall_id == this.SelSportHall.id);
      this.all_games_filtered = tmp_list;
    }
    this.date_list_all_games = new Array<Date>();
    this.all_games_filtered.forEach(element => {
      if (!(this.date_list_all_games.find(e => e == element.date))) {
        this.date_list_all_games.push(element.date);
      }
    });
    this.date_list_all_games.sort(function (a, b) {
      return a < b ? 1 : -1;
    });
    this.all_games_filtered.sort(
      function (a, b) {
        return a.time > b.time ? 1 : -1;
      });
  }

  load_live_games(reponse: response_listmatch) {
    reponse.list_match.forEach(m => {
      m.team_home_logo = reponse.list_logo.filter(x => x.id == m.club_home_id)[0].logo;
      m.team_away_logo = reponse.list_logo.filter(x => x.id == m.club_away_id)[0].logo;
      m.sporthall = reponse.list_sporthall.filter(x => x.id == m.sporthall_id)[0];
    })
    this.live_games = reponse.list_match;
    this.date_list_live_games = new Array<Date>();
    this.live_games.forEach(element => {
      if (!(this.date_list_live_games.find(e => e == element.date))) {
        this.date_list_live_games.push(element.date);
      }
    });
    this.date_list_live_games.sort(function (a, b) {
      return a < b ? 1 : -1;
    });
    this.live_games.sort(
      function (a, b) {
        return a.time > b.time ? 1 : -1;
      });

    if (this.live_games.length == 0) {
      this.disabledlive = true;
      this.activeindex = 1;
    } else {
      this.disabledlive = false;
      this.activeindex = 0;
    }
  }


}


