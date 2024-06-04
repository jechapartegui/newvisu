export class teams_standings{
  public id_rk :number = 0;
  public team_id:number = 0;
  public team_name = '';
  public round_id:number = 0;
  public ranking_order:number = 0;
  public team_logo:any;
  public PTS:number = 0;
  public GP: number = 0;
  public WIN: number = 0;
  public OT_WIN = 0;
  public DRAW = 0;
  public OT_LOST = 0;
  public LOST = 0;
  public FORFEIT = 0;
  public BONUS_OFF = 0; //bonus offensive
  public BONUS_DEF = 0; //bonus defensive
  public points_modification = 0;
  public GOAL_FOR = 0; //points for
  public GOAL_AGAINST = 0; //points against
  public GOAL_DIFF: number
  public club_name: string;
  public club_logo: string;
  public clubid: number;
}



