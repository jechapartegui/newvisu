import { categories } from "src/class/category";
import { Round } from "src/class/round";
import { season } from "src/class/season";
import { Tournament } from "src/class/tournament";

export class competitions_visu{
    selSeason:number;
    selCategory:number;
    selTournament:number;
    selRound:number;
    season_list:season[];
    category_list:categories[];
    tournament_list:Tournament[];
    round_list:Round[];
    thisSeason:season;
    thisCategory:categories;
    thisTournament:Tournament;
    thisRound:Round; 
    
}