import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NotifJechaComponent } from './custom-notification/custom-notification.component';
import { DefautComponent } from './defaut/defaut.component';
import { FormsModule } from '@angular/forms';
import { GlobalService } from 'src/services/global.services';
import { ErrorService } from 'src/services/error.service';
import { StaticClass } from './global';
import { DatePipe } from '@angular/common';
import { GameListComponent } from './game-list/game-list.component';
import { GameItemComponent } from './game-item/game-item.component';
import { SearchComponent } from './search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JoueurItemComponent } from './joueur-item/joueur-item.component';
import { EquipeItemComponent } from './equipe-item/equipe-item.component';
import { ClubItemComponent } from './club-item/club-item.component';
import { CompetitionItemComponent } from './competition-item/competition-item.component';
import { GymnaseItemComponent } from './gymnase-item/gymnase-item.component';
import { GamesComponent } from './games/games.component';
import { FilterTeamPipe } from 'src/filter/filter_team.pipe';
import { FilterRoundPipe } from 'src/filter/filter_round.pipe';
import { FilterSporthallPipe } from 'src/filter/filter_sporthall.pipe';
import { FilterTournamentPipe } from 'src/filter/filter_tournament.pipe';
import { CompetitionsComponent } from './competitions/competitions.component';
import { RoundDetailComponent } from './round-detail/round-detail.component';
import { CompetitionDetailComponent } from './competition-detail/competition-detail.component';
import { RankingComponent } from './ranking/ranking.component';
import { RankingPlayerComponent } from './ranking-player/ranking-player.component';
import { GameEventComponent } from './game-event/game-event.component';
import { JoueursComponent } from './joueurs/joueurs.component';
import { ClubsComponent } from './clubs/clubs.component';
import { PrizelistComponent } from './prizelist/prizelist.component';
import { ListSaisonComponent } from './list-saison/list-saison.component';

@NgModule({
  declarations: [ PrizelistComponent, ListSaisonComponent, JoueursComponent, ClubsComponent, FilterTeamPipe, FilterRoundPipe, FilterSporthallPipe, FilterTournamentPipe, CompetitionDetailComponent, RankingComponent, RankingPlayerComponent, GameEventComponent,
    AppComponent, NotifJechaComponent, GamesComponent, DefautComponent, GameListComponent, GameItemComponent, SearchComponent, JoueurItemComponent, EquipeItemComponent, ClubItemComponent, CompetitionItemComponent, GymnaseItemComponent, CompetitionsComponent, CompetitionItemComponent, RoundDetailComponent],
  imports: [
    BrowserModule,HttpClientModule,  BrowserAnimationsModule,
    AppRoutingModule, FormsModule
  ],
  providers: [GlobalService,  ErrorService, StaticClass, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
