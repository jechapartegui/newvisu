import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { teams_standings } from 'src/class/standings';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent {
  @Input() ranking: teams_standings[];
  @Input() is_ot: boolean = true;
  @Input() is_nul: boolean = true;
  @Input() is_fft: boolean = true;
  url = environment.url;
  public sort: "DIFF_ASC" | "DIFF_DESC" | "CONC_ASC" | "CONC_DESC" | "BUT_ASC" | "BUT_DESC" | "VIC_ASC" | "VIC_DESC" | "PTS_ASC" | "PTS_DESC" | "MJ_ASC" | "MJ_DESC" | "NUL_ASC" | "NUL_DESC" | "DEF_ASC" | "DEF_DESC" | "VIC_OT_ASC" | "VIC_OT_DESC" | "DEF_OT_ASC" | "DEF_OT_DESC" | "FFT_ASC" | "FFT_DESC" | "NO" = "NO";
  constructor(public router: Router) { }
  GoToTeam(id) {
    this.router.navigate(['/clubs'], { queryParams: { team: id } });
  }
  Sort(type: "BUT" | "CONC" | "VIC" | "MJ" | "PTS" | "NUL" | "DEF" | "VIC_OT" | "DEF_OT" | "FFT" | "DIFF") {
    switch (type) {
      case "BUT":
        if (this.sort == "BUT_DESC") {
          this.sort = "BUT_ASC";
        } else {
          this.sort = "BUT_DESC"
        }
        if (this.sort == "BUT_ASC") {
          this.ranking.sort((a, b) => Number(a.GOAL_FOR) < Number(b.GOAL_FOR) ? -1 : Number(a.GOAL_FOR) > Number(b.GOAL_FOR) ? 1 : 0);
        } else {
          this.ranking.sort((a, b) => Number(a.GOAL_FOR) > Number(b.GOAL_FOR) ? -1 : Number(a.GOAL_FOR) < Number(b.GOAL_FOR) ? 1 : 0);
        }
        break;

      case "CONC":
        if (this.sort == "CONC_ASC") {
          this.sort = "CONC_DESC";
        } else {
          this.sort = "CONC_ASC"
        }
        if (this.sort == "CONC_DESC") {
          this.ranking.sort((a, b) => Number(a.GOAL_AGAINST) > Number(b.GOAL_AGAINST) ? -1 : Number(a.GOAL_AGAINST) < Number(b.GOAL_AGAINST) ? 1 : 0);
        } else {
          this.ranking.sort((a, b) => Number(a.GOAL_AGAINST) < Number(b.GOAL_AGAINST) ? -1 : Number(a.GOAL_AGAINST) > Number(b.GOAL_AGAINST) ? 1 : 0);
        }
        break;
      case "VIC":
        if (this.sort == "VIC_DESC") {
          this.sort = "VIC_ASC";
        } else {
          this.sort = "VIC_DESC"
        }
        if (this.sort == "VIC_ASC") {
          this.ranking.sort((a, b) => Number(a.WIN) < Number(b.WIN) ? -1 : Number(a.WIN) > Number(b.WIN) ? 1 : 0);
        } else {
          this.ranking.sort((a, b) => Number(a.WIN) > Number(b.WIN) ? -1 : Number(a.WIN) < Number(b.WIN) ? 1 : 0);
        }
        break;
      case "MJ":
        if (this.sort == "MJ_DESC") {
          this.sort = "MJ_ASC";
        } else {
          this.sort = "MJ_DESC"
        }
        if (this.sort == "MJ_ASC") {
          this.ranking.sort((a, b) => Number(a.GP) < Number(b.GP) ? -1 : Number(a.GP) > Number(b.GP) ? 1 : 0);
        } else {
          this.ranking.sort((a, b) => Number(a.GP) > Number(b.GP) ? -1 : Number(a.GP) < Number(b.GP) ? 1 : 0);
        }
        break;
      case "PTS":
        if (this.sort == "PTS_DESC") {
          this.sort = "PTS_ASC";
        } else {
          this.sort = "PTS_DESC"
        }
        if (this.sort == "PTS_ASC") {
          this.ranking.sort((a, b) => Number(a.PTS) < Number(b.PTS) ? -1 : Number(a.PTS) > Number(b.PTS) ? 1 : 0);
        } else {
          this.ranking.sort((a, b) => Number(a.PTS) > Number(b.PTS) ? -1 : Number(a.PTS) < Number(b.PTS) ? 1 : 0);
        }
        break;
      case "NUL":
        if (this.sort == "NUL_DESC") {
          this.sort = "NUL_ASC";
        } else {
          this.sort = "NUL_DESC"
        }
        if (this.sort == "NUL_ASC") {
          this.ranking.sort((a, b) => Number(a.DRAW) < Number(b.DRAW) ? -1 : Number(a.DRAW) > Number(b.DRAW) ? 1 : 0);
        } else {
          this.ranking.sort((a, b) => Number(a.DRAW) > Number(b.DRAW) ? -1 : Number(a.DRAW) < Number(b.DRAW) ? 1 : 0);
        }
        break;
      case "DEF":
        if (this.sort == "DEF_ASC") {
          this.sort = "DEF_DESC";
        } else {
          this.sort = "DEF_ASC"
        }
        if (this.sort == "DEF_DESC") {
          this.ranking.sort((a, b) => Number(a.LOST) > Number(b.LOST) ? -1 : Number(a.LOST) < Number(b.LOST) ? 1 : 0);
        } else {
          this.ranking.sort((a, b) => Number(a.LOST) < Number(b.LOST) ? -1 : Number(a.LOST) > Number(b.LOST) ? 1 : 0);
        }
        break;
      case "DEF_OT":
        if (this.sort == "DEF_OT_ASC") {
          this.sort = "DEF_OT_DESC";
        } else {
          this.sort = "DEF_OT_ASC"
        }
        if (this.sort == "DEF_OT_DESC") {
          this.ranking.sort((a, b) => Number(a.OT_LOST) > Number(b.OT_LOST) ? -1 : Number(a.OT_LOST) < Number(b.OT_LOST) ? 1 : 0);
        } else {
          this.ranking.sort((a, b) => Number(a.OT_LOST) < Number(b.OT_LOST) ? -1 : Number(a.OT_LOST) > Number(b.OT_LOST) ? 1 : 0);
        }
        break;
      case "FFT":
        if (this.sort == "FFT_ASC") {
          this.sort = "FFT_DESC";
        } else {
          this.sort = "FFT_ASC"
        }
        if (this.sort == "FFT_DESC") {
          this.ranking.sort((a, b) => Number(a.FORFEIT) > Number(b.FORFEIT) ? -1 : Number(a.FORFEIT) < Number(b.FORFEIT) ? 1 : 0);
        } else {
          this.ranking.sort((a, b) => Number(a.FORFEIT) < Number(b.FORFEIT) ? -1 : Number(a.FORFEIT) > Number(b.FORFEIT) ? 1 : 0);
        }
        break;
      case "VIC_OT":
        if (this.sort == "VIC_OT_DESC") {
          this.sort = "VIC_OT_ASC";
        } else {
          this.sort = "VIC_OT_DESC"
        }
        if (this.sort == "VIC_OT_ASC") {
          this.ranking.sort((a, b) => Number(a.OT_WIN) < Number(b.OT_WIN) ? -1 : Number(a.OT_WIN) > Number(b.OT_WIN) ? 1 : 0);
        } else {
          this.ranking.sort((a, b) => Number(a.OT_WIN) > Number(b.OT_WIN) ? -1 : Number(a.OT_WIN) < Number(b.OT_WIN) ? 1 : 0);
        }
        break;
      case "DIFF":
        if (this.sort == "DIFF_DESC") {
          this.sort = "DIFF_ASC";
        } else {
          this.sort = "DIFF_DESC"
        }
        if (this.sort == "DIFF_ASC") {
          this.ranking.sort((a, b) => Number(a.GOAL_DIFF) < Number(b.GOAL_DIFF) ? -1 : Number(a.GOAL_DIFF) > Number(b.GOAL_DIFF) ? 1 : 0);
        } else {
          this.ranking.sort((a, b) => Number(a.GOAL_DIFF) > Number(b.GOAL_DIFF) ? -1 : Number(a.GOAL_DIFF) < Number(b.GOAL_DIFF) ? 1 : 0);
        }
        break;


    }
  }
}