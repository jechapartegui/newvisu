import { full_player } from "src/class/full_player";
import { player_game } from "src/class/player_game_detail";
import { prizelist } from "src/class/prizelist";
import { response_listmatch } from "src/class/response_listmatch";
import { response_seasons } from "src/class/response_seasons";
import { season } from "src/class/season";

export class player_visu {
  player: full_player;
  search_display: boolean;
  search_result_display: boolean;
  player_display: boolean;
  season_list: season[];
  overall_stat: player_game;
  date_list: Date[] = [];

  load_page_joueur(_joueur: full_player, _match_list: response_listmatch, _season_list: response_seasons, _przl: prizelist[]) {
    this.player = _joueur;

    this.date_list = new Array<Date>();
    _match_list.list_match.forEach(m => {
      m.sporthall = _match_list.list_sporthall.filter(x => x.id == m.sporthall_id)[0];
      if (!(this.date_list.find(e => e == m.date))) {
        this.date_list.push(m.date);
      }
      if (m.player) {
        if (m.player.isgoalkeeper == 1) {
          if (Number(m.player.saves) + Number(m.player.goal_conceed) > 0) {
            m.player.shots = Number(m.player.saves) + Number(m.player.goal_conceed);
            m.player.pc_saves = m.player.saves / (m.player.shots) * 100;
          } else {
            m.player.pc_saves = 0;
          }
        }
      }
    })
    this.date_list.sort(function (a, b) {
      return a < b ? 1 : -1;
    });

    this.player.matchs_list = _match_list.list_match.sort((a, b) => (a.date > b.date) ? -1 : 1);
    this.player.seasons_details = _season_list.seasons;
    this.season_list = new Array<season>();
    this.overall_stat = new player_game();
    this.player.seasons_details.forEach(element => {
      if (!(this.season_list.find(e => e.id == element.season_id))) {
        var ss = new season();
        ss.id = element.season_id;
        ss.iscurrent = 0;
        ss.name = element.season_name;
        this.season_list.push(ss);
      }
      this.overall_stat.games_played += element.player.games_played;
      this.overall_stat.mvp += element.player.mvp;
      this.overall_stat.goal += element.player.goal;
      this.overall_stat.assist += element.player.assist;
      this.overall_stat.fault += element.player.fault;
      this.overall_stat.saves += element.player.saves;
      this.overall_stat.goal_conceed += element.player.goal_conceed;
      element.club_logo = _season_list.list_logo.filter(x => x.id == element.club_id)[0].logo;
    });
    if ((this.overall_stat.saves + this.overall_stat.goal_conceed) > 0) {
      this.overall_stat.shots = this.overall_stat.saves + this.overall_stat.goal_conceed;
      this.overall_stat.pc_saves = this.overall_stat.saves / (this.overall_stat.shots) * 100;
    } else {
      this.overall_stat.pc_saves = 0;
    }
    this.season_list.sort(function (a, b) {
      return a.id < b.id ? 1 : -1;
    });
    this.player = _joueur;
    this.player.statistics = this.overall_stat;
    this.player.prizelist = _przl;
  }

}
