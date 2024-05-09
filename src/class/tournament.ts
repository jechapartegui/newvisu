import { additionnal_info } from "./additionnal_info";
import { full_game } from "./full_game";
import { prizelist } from "./prizelist";
import { ranking_player } from "./ranking_points";
import { resume } from "./resume";

export class Tournament {
    public id:number = 0;
    public name:string = '';
    public shortname:string= '';
    public division:number = null;
    public division_name:string;
    public agecategory_id:number = 0;
    public kind:number = 1;
    public kind_name:string = '';
    public non_official_teams:boolean = false;
    public non_official_players:boolean= false;
    public reason_of_cancel:string ="";
    public is_canceled:boolean= false;
    public logo:string= '';
    public color1:string= '#ffffff';
    public color2:string= '#000000';
    public status:number = 1;
    public status_name:string= '';
    public organizator:number = 1;
    public organizator_name:string= '';
    public agecategory_name:string= '';
    public season_id:number = 0;
    public season_name:string= '';
    public ranking_points_list:Array<ranking_player>;
    public ranking_goalies_list:Array<ranking_player>;
    public prizelist:Array<prizelist>;
    public game_lists:Array<full_game>;
    public date_list:Array<Date>;
    public stats:resume[];
}
