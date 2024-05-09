import {full_game} from "./full_game";
import {full_season} from "./full_season";
import {player_game} from "./player_game_detail";
import {prizelist} from "./prizelist";
import {resume} from "./resume";


export class full_player  {
    id:number;
    firstname:string;
    lastname:string;
    nat1:string;
    nat2:string;
    birthdate:Date;
    licencenumber:string;
    sex:string;
    clubid:number;
    clubname:string;
    clublogo:string;
    photo:string;
    statistics:player_game;
    seasons_details:Array<full_season>;
    matchs_list:Array<full_game>;
    position: string;
    number:number;
    resume:resume[];
    prizelist:prizelist[];
    height:number;
    grip:string;
    age: string;
    isprivate: number;
  nat3: string;
  }

