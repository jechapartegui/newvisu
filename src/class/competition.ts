import { full_game } from "./full_game";
import { obj_master } from "./obj_master";
import { prizelist } from "./prizelist";
import { ranking_player } from "./ranking_points";
import { Round } from "./round";

export class competitions extends obj_master {
  name: string;
  shortname: string;
  division: number;
  agecategoryid: number;
  kind: number;
  non_official_teams:boolean;
  non_official_players:boolean;
  reason_of_cancel:string;
  is_canceled:boolean;
  logo: string;
  color1: string;
  color2: string;
  status: number;
  agecategoryname: string;
  kind_name: string;
  organisation: number;
  organisation_name: string;
  season: number;
  season_name: string;
  ranking_points_list:Array<ranking_player>;
  ranking_goalies_list:Array<ranking_player>;
  round_list:Array<Round>;
  game_lists:Array<full_game>;
  date_list:Array<Date>;
  palmares:prizelist[];
}

