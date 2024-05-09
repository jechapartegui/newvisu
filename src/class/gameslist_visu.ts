import { full_game } from "./full_game";

export class gameslist_visu {
  gameslist: Array<full_game>;
  view: string;
  classtime: string;
  classdate: string;
  classsh: string;
  classlogo: string;
  classequipe: string;
  classcompetition: string;
  classbtn:string;
  classscore:string;

  constructor(_gl?: Array<full_game>, _vue?: string) {
    if (_gl) {
      this.gameslist = _gl;
      this.gameslist.sort((a, b) => a.date < b.date ? -1 : a.date > b.date ? 1 : 0);
      this.view = _vue;
    } else {
      this.gameslist = new Array<full_game>();
      this.view = "standard";
    }
    this.updateview();
  }

  updateview() {
    switch (this.view) {
      case "teams": {
        //statements;
        break;
      }
      case "nextgames": {
        //statements;
        this.classcompetition = "col-xs-1 col-md-1 col-lg-2";
        this.classlogo = "col-xs-1 col-md-1 col-lg-1";
        this.classequipe = "col-xs-1 col-md-1 col-lg-2";
        this.classsh = "col-xs-1 col-md-1 col-lg-1";
        this.classtime = "col-xs-1 col-md-1 col-lg-1";
        this.classdate = "col-xs-1 col-md-1 col-lg-1";
        this.classscore = "col-xs-1 col-md-1 col-lg-1";
        this.classbtn = "col-xs-1 col-sm-1 hidden-md-up";
        break;
      }
      case "players": {
        //statements;
        break;
      }
      case "competitions": {
        //statements;
        break;
      }
      case "standard":
      default: {
        //statements;
        break;
      }
    }
  }
}
