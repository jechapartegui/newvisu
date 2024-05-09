import { additionnal_info } from "./additionnal_info";
import { resume } from "./resume";

export class response_more_info{
  public add_infos : additionnal_info[];
  public stats: resume[];
  public contacts: additionnal_info[];
}

export class response_loadpage{
  public player :number;
  public season:number;
  public agecategory:number;
  public tournament:number;
  public round:number;
  public team:number;
  public club:number;

}
