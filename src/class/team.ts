import {full_game} from "./full_game";
import {obj_master} from "./obj_master";
import {officials} from "./official";
import {full_player} from "./full_player";
import {prizelist} from "./prizelist";
import {ranking_player} from "./ranking_points";
import {teams_standings} from "./standings";

export class teams extends obj_master {
  name: string;
  clubname: string;
  logoclub: string;
  clubid: number;
  agecategoryid: number;
  category: string;
  colorhome1: string;
  colorhome2: string;
  coloraway1: string;
  coloraway2: string;
  seasonname: string;
  seasonid: number;
  games_list: Array<full_game>;
  date_list: Array<Date>;
  prizes: Array<prizelist>;
  officiels: Array<officials>;
  players: Array<full_player>;
  ranking_team: Array<teams_standings>;
  ranking_points_list: Array<ranking_player>;
  defaultcolorhome1: string;
  defaultcolorhome2: string;
  defaultcoloraway1: string;
  defaultcoloraway2: string;
}
