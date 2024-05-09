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

@NgModule({
  declarations: [
    AppComponent, NotifJechaComponent, DefautComponent, GameListComponent, GameItemComponent],
  imports: [
    BrowserModule,HttpClientModule,
    AppRoutingModule, FormsModule
  ],
  providers: [GlobalService,  ErrorService, StaticClass, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
