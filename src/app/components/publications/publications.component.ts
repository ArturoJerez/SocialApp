import { Component, DoCheck, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as $ from 'jquery';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../../services/user.service';
import { PublicationsService } from '../../services/publications.service';
import { GLOBAL } from '../../services/global';
import { Publication } from '../../../models/publication';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss'],
  providers: [UserService, PublicationsService]
})
export class PublicationsComponent implements OnInit {

  public identity;
  public stats: any;
  public url: string;
  public token;
  public status;
  public publication: Publication;
  public page;
  public total;
  public pages;
  public items_per_page;
  public publications: Publication[];
  @Input() user: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _publicationsService: PublicationsService
    ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.stats = this._userService.getStats();
    this.url = GLOBAL.url;
    this.publication = new Publication("", "", "", "", this.identity._id);
    this.page = 1;
  }

  ngOnInit(): void {
    console.log('Publicaciones de usuario cargadas...');
    this.getPublications(this.user, this.page);
  }

  getPublications(user, page, adding = false) {
    this._publicationsService.getPublicationsUser(this.token, user, page).subscribe(
      (response) => {
        if(response.publications) {
          this.total = response.total_items;
          this.pages = response.pages;
          this.items_per_page = response.items_per_page;

          if(!adding) {
            this.publications = response.publications;
          } else {
            var arrayA = this.publications;
            var arrayB = response.publications;
            this.publications = arrayA.concat(arrayB);

            $("html, body").animate({scrollTop: $('body').prop("scrollHeight")}, 500);
          }

          this.status = 'success';
        } else {
          this.status = 'error';
        }
      },
      (error) => {
        var errorMessage = <any>error;
        console.log(errorMessage);

        if(errorMessage != null) {
          this.status = 'error';
        }
      }
    )
  }

  public noMore = false;
  viewMore() {
    this.page += 1;
    if(this.page == this.pages) {
      this.noMore = true;
    }
    this.getPublications(this.user, this.page, true);
  }

  loadData(event) {
    setTimeout(() => {
      this.page += 1;
      if(this.page == this.pages) {
        this.noMore = true;
      }

      event.target.complete();
      this.getPublications(this.user, this.page, true);
    }, 1000);
  }

}
