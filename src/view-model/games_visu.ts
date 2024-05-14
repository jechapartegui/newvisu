import { detailed_score } from "src/class/detailed_score";
import { full_game, part_game } from "src/class/full_game";
import { game_events } from "src/class/game_events";
import { officials } from "src/class/official";
import { player_game } from "src/class/player_game_detail";
import { referee } from "src/class/referee";

export class games_visu{
    public match: full_game;
  public events: Array<game_events>;

  constructor(_match: full_game, _player : player_game[], _off : officials[], _ref : referee[], _score : detailed_score[], _event : game_events[]) {
    if (_match) {
      this.match = _match;
      this.match.events = _event;
      this.match.home_players = _player.filter(x => x.teamid == this.match.team_home_id);
      this.match.away_players = _player.filter(x => x.teamid == this.match.team_away_id);
      this.match.officials = _off;
      this.match.referees = _ref;
      this.match.scores = _score;
      this.match.events.forEach(ev => {
        if(ev.playerid1 >0){
          ev.player1photo = _player.filter(x => x.id == ev.playerid1)[0].photo;
        }
        if(ev.playerid2 >0){
          ev.player2photo = _player.filter(x => x.id == ev.playerid2)[0].photo;
        }
        if(ev.teamid == this.match.team_home_id){
          ev.teamlogo = this.match.team_home_logo;
        }
        if(ev.teamid == this.match.team_away_id){
          ev.teamlogo = this.match.team_away_logo;
        }

        // build a timestamp that will be used for sorting on the timeline
        ev.timestamp = this.buildEventTimestamp(ev);
      });

      this.match.events.sort(
        function(a, b) {
           return a.timestamp > b.timestamp ? -1 : 1;
        });
    }
  }

  buildEventTimestamp(ev: game_events) : number{
        // add an incremental offset for each period, so that events from 1st will be before events from 2nd, etc
        let periodOffset = 0;
        switch (ev.period){
          case "1st" : periodOffset = 0; break;
          case "2nd" : periodOffset = 10000; break;
          case "3rd" : periodOffset = 20000; break;
          case "XT"  : periodOffset = 30000; break;
          case "PEN" : periodOffset = 40000; break;
        }
        const [hours, minutes, seconds] = ev.time.split(':')
        const timestamp = periodOffset /** + Number(hours)*3600 -- no hour in 20 min period... */ + Number(minutes)*60 + Number(seconds)
        return timestamp
  }

  update(_part_game:part_game){
    this.match.events = _part_game.events;
    this.match.is_live = _part_game.is_live;
    this.match.score_home = _part_game.score_home;
    this.match.score_away = _part_game.score_away;
    this.match.scores = _part_game.scores;
    this.match.home_players = _part_game.players.filter(x => x.teamid == this.match.team_home_id);
    this.match.away_players = _part_game.players.filter(x => x.teamid == this.match.team_away_id);
  }
}
