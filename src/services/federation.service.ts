import { Injectable } from '@angular/core';
import { GlobalService } from './global.services';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FederationService {

  url :string;
  constructor(public global: GlobalService) {
  }
  public setFederation(federation): Promise<boolean> {
    // si pas de compte rattacher, renvoyer 0 en compte avec mail : NO_ACCOUNT
    this.url = environment.url + '/federation_set_current.php';
    //  this.url = this.url + "login.php";
    const body = {
      code: federation
    };
    

    return this.global.POST(this.url, body)
      .then(() => {
        return true;
      })
      .catch(error => {
        // Gestion de l'erreur
        return Promise.reject(error);
      });
  }

  

}
