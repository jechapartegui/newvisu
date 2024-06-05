import { clubs } from "src/class/club";
import { full_game } from "src/class/full_game";
import { full_player } from "src/class/full_player";
import { response_listmatch } from "src/class/response_listmatch";
import { Round } from "src/class/round";
import { season } from "src/class/season";
import { teams_standings } from "src/class/standings";
import { short_team, teams } from "src/class/team";

export class club_visu {
    thisClub: clubs;
    thisTeam: teams;
    list_club: clubs[];
    list_team: teams[];
    list_season: season[];
    list_saison_club: season_club[];
}

export class season_club {
    list_team: team_to_display[];
    season:season;
    display:boolean = false;
    constructor(list: short_team[], sea:season) {
        this.list_team = [];
        this.season = sea;
        list.forEach((l) => {
            let ttd: team_to_display = new team_to_display(l);
            this.list_team.push(ttd);
        })
    }
}

export class team_to_display {
    thisTeam: teams;
    shortTeam: short_team;
    data_loaded: boolean = false;
    display: boolean = false;
    constructor(short: short_team) {
        this.shortTeam = short;
        this.data_loaded = false;
        this.display = false;
    }

    Update(tem: teams, _pl: full_player[], _mt: response_listmatch, _rk: Round[]) {
        this.thisTeam = tem;
        this.thisTeam.players = _pl;
        this.thisTeam.rounds_rk = _rk;
        _mt.list_match.forEach(m => {
            m.team_home_logo = _mt.list_logo.filter(x => x.id == m.club_home_id)[0].logo;
            m.team_away_logo = _mt.list_logo.filter(x => x.id == m.club_away_id)[0].logo;
            m.sporthall = _mt.list_sporthall.filter(x => x.id == m.sporthall_id)[0];
        })
        this.thisTeam.games_list = _mt.list_match;
        this.thisTeam.date_list = new Array<Date>();
        this.thisTeam.games_list.forEach(element => {
            if (!(this.thisTeam.date_list.find(e => e == element.date))) {
                this.thisTeam.date_list.push(element.date);
            }
        });
        this.thisTeam.date_list.sort(function (a, b) {
            return a < b ? 1 : -1;
        });
        this.thisTeam.games_list.sort(
            function (a, b) {
                return a.time > b.time ? 1 : -1;
            }
        );
        this.data_loaded = true;
        
    }

} 