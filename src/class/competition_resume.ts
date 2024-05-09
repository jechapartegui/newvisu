export class competition_resume{
  winnername:string;
  winnerid:number;
  runnerupname:string;
  runnerupid:number;
  bestscorername:string;
  bestscorerid:number;
  display:boolean;
  has_resume:boolean;
  constructor(){
    this.winnername="",
    this.winnerid=0,
    this.runnerupname="",
    this.runnerupid=0,
    this.bestscorerid=0,
    this.bestscorername="",
    this.display = false;
    this.has_resume=false;
  }
  }
