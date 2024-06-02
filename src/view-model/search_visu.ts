import { search_global_result } from "src/class/search_result";

export class search_visu {
    search_total_count: number = 0;
    players_results_count: number;
    clubs_results_count: number;
    teams_results_count: number;
    sporthalls_results_count: number;
    competitions_results_count: number;
    search_players: any[] = [];
    search_clubs: any[] = [];
    search_teams: any[] = [];
    search_sporthalls: any[] = [];
    search_competitions: any[] = [];
    search_text: string;
    selected: "JOUEUR" | "CLUB" | "COMPETITION" | "GYMNASE" | "EQUIPE"

    load_search(list_search: search_global_result) {
        this.search_clubs = list_search.club;
        this.search_competitions = list_search.tournament;
        this.search_players = list_search.player;
        this.search_teams = list_search.team;
        this.search_sporthalls = list_search.sporthall;
        var max = 0;
        if (this.search_players && this.search_players.length > 0) {
            if (this.search_players.length > max) {
                max = this.search_players.length;
                this.selected = "JOUEUR";
            }
        } 
        if (this.search_clubs.length > 0) {
            if (this.search_clubs.length > max) {
                max = this.search_clubs.length;
                this.selected = "CLUB";
            }
        }
        if (this.search_teams.length > 0) {
            if (this.search_teams.length > max) {
                max = this.search_teams.length;
                this.selected = "EQUIPE";
            }
        }
        if (this.search_competitions.length > 0) {
            if (this.search_competitions.length > max) {
                max = this.search_competitions.length;
                this.selected = "COMPETITION";
            }
        }
        if (this.search_sporthalls.length > 0) {
            if (this.search_sporthalls.length > max) {
                max = this.search_sporthalls.length;
                this.selected = "GYMNASE";
            }
        }
        this.sporthalls_results_count = this.search_sporthalls.length;
        this.clubs_results_count = this.search_clubs.length;
        this.teams_results_count = this.search_teams.length;
        this.players_results_count = this.search_players.length;
        this.competitions_results_count = this.search_competitions.length;
        this.search_total_count = this.sporthalls_results_count + this.clubs_results_count + this.teams_results_count + this.players_results_count + this.competitions_results_count;
    }
}