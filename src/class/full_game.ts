import {detailed_score} from "./detailed_score";
import {game_events} from "./game_events";
import {obj_master} from "./obj_master";
import {officials} from "./official";
import {player_game} from "./player_game_detail";
import {referee} from "./referee";
import {sporthall} from "./sporthall";


export class full_game extends obj_master {
  public date: Date;
  public time: string;
  public is_live: boolean;
  public competition_id: number;
  public competition_name: string;
  public round_id: number;
  public round_name: string;
  public season_name: string;
  public season_id: number;
  public category_name: string;
  public category_id: number;

  public description: string;
  public attendance:number;
  public is_played: boolean;
  public is_confirmed: boolean;
  public designated_referee: string;

  public team_home_name: string;
  public team_home_id: number;
  public club_home_name: string;
  public club_home_id: number;
  public team_home_logo: string;
  public team_away_name: string;
  public team_away_id: number;
  public club_away_id: number;
  public club_away_name: number;
  public team_away_logo: string;

  public team_home_color: string;
  public team_away_color: string;

  public sporthall: sporthall;
  public sporthall_id:number;
  public events: Array<game_events>;
  public home_players: Array<player_game>;
  public away_players: Array<player_game>;
  public player: player_game;
  public officials: Array<officials>;
  public referees: Array<referee>;

  public score_home: number;
  public score_away: number;

  public scores: Array<detailed_score>;

  public is_forfait_home: boolean;
  public is_forfait_away: boolean;
  public is_forfait_both: boolean;
  public is_canceled: boolean;
  public reason_of_cancel: string;
  public comments: string;
  public remarkable_conditions:string;

  public is_started: boolean;
  public is_postponed: boolean;
  public postponed_initial_date: Date;

  public mvp_home: number;
  public mvp_away: number;
  isinter: number;
  inter_ha: string;
  inter_oppo: string;

}

export class part_game{
  public id: number;
  public events: Array<game_events>;
  public players: Array<player_game>;
  public score_home: number;
  public score_away: number;

  public scores: Array<detailed_score>;
  public is_live: boolean;
}


