import { full_game } from "./full_game";
import { sporthall } from "./sporthall";

export class response_listmatch {
list_match: Array<full_game>;
list_logo: Array<logo>;
list_sporthall: Array<sporthall>;
}

export class logo{
id:number;
logo:string;
}
