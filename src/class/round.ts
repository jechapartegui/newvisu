import { full_game } from "./full_game";
import { ranking_player } from "./ranking_points";
import { teams_standings } from "./standings";
import { resume } from "./resume";

export class Round {
  public id: number = 0;
  public name: string;
  public tournament_id: number = 0;
  public tournament_name: string;
  public type: number;
  public level: number = 1;
  public comp_order: number = 1;
  public rankingsystem: string;
  public pointssystem: string;
  public relatedtoid?: number = 0;
  public relatedtoid2?: number = 0;
  public relatedtoid3?: number = 0;
  public relatedtoid4?: number = 0;
  public agecategoryid: number = 0;
  public teamwinner?: number;
  public teamrunnerup?: number;
  public bestscorer?: number;
  public iscanceled: boolean = false;
  public ishide: boolean = false;
  public is_nul: boolean = false;
  public is_ot: boolean = false;
  public is_fft: boolean = false;
  public reasonofcancel: string;
  public match_goalkeeper_required: boolean = true;
  public match_max_players: number;
  public season_id: number;
  public nb_teams: number;
  public status: number;
  public status_name: string;
  ranking_points_list: Array<ranking_player>;
  ranking_goalies_list: Array<ranking_player>;
  ranking_team: Array<teams_standings>;
  game_lists: Array<full_game>;
  date_list: Array<Date>;
  public stats: resume[];
  public param_round: param_round;
}

export class param_round {
  update_display_standing(ranking_team: Array<teams_standings>) {
    this.WIN_AFT_SO = false;
    this.LOST_AFT_SO = false;
    this.DRAW_POSSIBLE = true;
    this.GROUP_STAGE_ET = false;
    this.BONUS_OF = false;
    this.BONUS_DF = false;
    this.IS_FORFEIT = false;
    this.IS_PTS_MODIF = false;
    if (ranking_team) {
      ranking_team.forEach((rk) => {
        if (rk.OT_WIN > 0) {
          this.WIN_AFT_SO = true;
        }
        if (rk.OT_LOST > 0) {
          this.LOST_AFT_SO = true;
        }
        if (rk.points_modification > 0) {
          this.IS_PTS_MODIF = true;
        }
        if (rk.FORFEIT > 0) {
          this.IS_FORFEIT = true;
        }
        if (rk.BONUS_DEF > 0) {
          this.BONUS_DF = true;
        }
        if (rk.BONUS_OFF > 0) {
          this.BONUS_OF = true;
        }
      })
    }
  }
  public WIN_AFT_SO: boolean = false;
  public LOST_AFT_SO: boolean = false;
  public GROUP_STAGE_SO: boolean = false;
  public DRAW_POSSIBLE: boolean = false;
  public GROUP_STAGE_ET: boolean = false;
  public BONUS_OF: boolean = false;
  public BONUS_DF: boolean = false;
  public IS_FORFEIT: boolean = false;
  public IS_PTS_MODIF: boolean = false;
  public NB_ROUNDS: number = 1;
}
