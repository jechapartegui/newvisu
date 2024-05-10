import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, firstValueFrom, timeout } from 'rxjs';
import { DatePipe } from '@angular/common';
import { environment } from 'src/environments/environment.prod';
import { search_global_result } from 'src/class/search_result';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private isSelectedMenu = new BehaviorSubject<"MATCH" | "CLUB" | "COMPETITION">("MATCH");
  static selected_menu: "MATCH" | "CLUB" | "COMPETITION" = "MATCH";
  SelectedMenu$: Observable<"MATCH" | "CLUB" | "COMPETITION"> = this.isSelectedMenu.asObservable();

  url: string;
  thisLanguage: "FR" | "EN" | "NL";
  constructor(private http: HttpClient, private datepipe: DatePipe) { }
  updateSelectedMenuStatus(selected: "MATCH" | "CLUB" | "COMPETITION" ): void {
    this.isSelectedMenu.next(selected);
    GlobalService.selected_menu = selected;
  }

  public async GET(url: string): Promise<any> {

    try {
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
      const response = await firstValueFrom(this.http.get(url));
      return response;
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        this.handleError(error);
      } else {
        console.error('Une erreur inattendue s\'est produite:', error);
        throw new Error('Une erreur inattendue s\'est produite. Veuillez réessayer plus tard.');
      }
    }
  }
  public async POST(url: string, body: any): Promise<any> {
    try {
      const timeoutMilliseconds = 50000;


      const headers = new HttpHeaders()
        .set('content-type', 'application/json')
        .set('Access-Control-Allow-Origin', '*')
        .set('lang', this.getCurrentLanguage())
      const response = await firstValueFrom(
        this.http.post(url, body, { headers }).pipe(
          timeout(timeoutMilliseconds),
          catchError((error) => {
            if (error.name === 'TimeoutError') {
              throw new Error('La requête a expiré en raison du délai dépassé.');
            } else {
              throw error; // Gérer d'autres erreurs ici
            }
          })
        )
      );
      return response;
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        this.handleError(error);
      } else {
        console.log(error);
        throw new Error('Une erreur inattendue s\'est produite. Veuillez réessayer plus tard.');
      }
    }
  }

  private handleError(error: HttpErrorResponse): void {
    let message: string;
    if (error.error instanceof ErrorEvent) {

      message = error.error.message;
    } else {
      message = error.statusText;

    }
    throw new Error(message);
  }

  public getCurrentLanguage(): "FR" | "EN" | "NL" {
    if (navigator.languages && navigator.languages.length) {
      if (navigator.languages[0].toLowerCase().includes("EN")) {
        return "EN";
      }
      if (navigator.languages[0].toLowerCase().includes("US")) {
        return "EN";
      } else {
        return "FR";
      }
    } else {
      return "FR";
    }
  }

  updateCookieLanguage(): Promise<boolean> {
    this.url = environment.url + 'public_user_set_language.php';
    //  this.url = this.url + "login.php";
    const body = {
      language: this.getCurrentLanguage()
    };


    return this.POST(this.url, body)
      .then(() => {
        return true;
      })
      .catch(error => {
        // Gestion de l'erreur
        return Promise.reject(error);
      });
  }

  searchGlobal($text: string): Promise<search_global_result> {
    this.url = environment.url + 'public_global_search.php';
    //  this.url = this.url + "login.php";
    const body = {
      text: $text,
      new:true
    };


    return this.POST(this.url, body)
      .then((retour:search_global_result) => {
        return retour;
      })
      .catch(error => {
        // Gestion de l'erreur
        return Promise.reject(error);
      });
  }


  setLanguageFromPath()  {
    this.thisLanguage = 'FR' // Default...
    let thisUrl: string = location.href;
    if (thisUrl.indexOf("/en/") > 0) {
      this.thisLanguage = 'EN';
      console.log("EN")
    }
    if (thisUrl.indexOf("/nl/") > 0) {
      this.thisLanguage = 'NL';
    }
    if (thisUrl.indexOf("/fr/") > 0) {
      this.thisLanguage = 'FR';
    }
    this.updateCookieLanguage().then(() => {
      return true;
    })    .catch(error => {
      // Gestion de l'erreur
      return Promise.reject(error);
    });
  }
}
