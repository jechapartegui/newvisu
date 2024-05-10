import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorService } from 'src/services/error.service';
import { GlobalService } from 'src/services/global.services';
import { search_visu } from 'src/view-model/search_visu';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  visu:search_visu;
  action:string=  $localize`Effectuer une rechercher`;
  constructor(private route: ActivatedRoute, public globalserv:GlobalService) { }
  ngOnInit(): void {
    this.visu = new search_visu();
    const errorService = ErrorService.instance;
    this.route.queryParams.subscribe(params => {
      console.log(params);
      if ('search' in params) {
        this.visu.search_text = params['search'];
        this.globalserv.searchGlobal(this.visu.search_text).then((result) =>{
          this.visu.load_search(result);
          let o = errorService.OKMessage(this.action);
          errorService.emitChange(o);
        }).catch((err) => {
          let o = errorService.CreateError(this.action, err.message);
          errorService.emitChange(o);
        });
      } else {

      }

    });

  }
}
