import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefautComponent } from './defaut/defaut.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  // { path: '', redirectTo: 'defaut', pathMatch: 'full' }, // Redirection vers 'defaut' pour le path vide
   { path: '', component: DefautComponent }, // Route 'defaut' qui affiche ImportRidersComponent
   { path: 'search', component: SearchComponent }, // Route 'defaut' qui affiche ImportRidersComponent
  
 ];
 
 @NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
 })
 export class AppRoutingModule { }
