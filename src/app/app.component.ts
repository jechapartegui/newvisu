import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from 'src/services/error.service';
import { StaticClass } from './global';
import { NotifJechaComponent } from './custom-notification/custom-notification.component';
import { GlobalService } from 'src/services/global.services';
import { environment } from 'src/environments/environment.prod';
import { FederationService } from 'src/services/federation.service';
import { default_visu } from 'src/view-model/default_visu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Visu Floorball';
  action: string;
  isactive: boolean = false;
  g: StaticClass;
  search_text:string;
  envt = environment;
  @ViewChild(NotifJechaComponent, { static: true }) child: NotifJechaComponent;
  constructor(
    public GlobalService: GlobalService,
    private erroservice: ErrorService,
    private _router: Router,
    public globals: StaticClass,
    private federationservice: FederationService
  ) {
    this.g = globals;
    erroservice.changeEmitted$.subscribe((data) => {
      this.DisplayError(data);
    })
  }
  public selected_menu: "MATCH" | "JOUEUR" | "CLASSEMENT" | "CLUB" | "CHAMPIONNAT"= "MATCH";
  ngOnInit(): void {
    this.setFederation();
  }
  isact() {
    if (this.isactive) {
      this.isactive = false;
    } else {
      this.isactive = true;
    }
  }

  setFederation(): void {
    const errorService = ErrorService.instance;
    this.action = $localize`Charger le site`;
    this.federationservice.setFederation(this.envt.federation).then(() => {
      this.GlobalService.setLanguageFromPath();

    }).catch((err) => {
      let o = errorService.CreateError(this.action, err.message);
      errorService.emitChange(o);
    });

  }



  keyDownFunction(event: { keyCode: number; }) {
    const errorService = ErrorService.instance;
    this.action = $localize`Rechercher`;
    if (event.keyCode === 13) {
      if(this.search_text.length < 3){
        let o = errorService.CreateError(this.action, $localize`3 caractères minimum pour effectuer une recherche`);
        errorService.emitChange(o);
      } else {
        this._router.navigate(['default', {search: this.search_text}])
          .then(() => {
            window.location.reload();
          });

      }
    }
  }


  DisplayError(val) {
    this.child.display_notification(val);
  }
}