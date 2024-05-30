import {full_player} from "./full_player";
import {obj_master} from "./obj_master";
import {prizelist} from "./prizelist";
import {resume} from "./resume";
import { season } from "./season";

export class clubs extends obj_master {
  name:string;
  streetaddress:string;
  logo:string;
  shortname:string;
  postcode:string;
  city:string;
  email: string;
  website: string;
  phone: string;
  prizelist: prizelist[] = [];
  resume: resume[] = [];
  players: full_player[] = [];
  colorhome1: string;
  colorhome2: string;
  coloraway1: string;
  coloraway2: string;
  region1: string;
  region2: string;
  halls: any;
  teams:any[] = [];
  list_season:season[] = [];
}
