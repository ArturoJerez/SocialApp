import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../../services/user.service';
import { PublicationsService } from '../../services/publications.service';

import { GLOBAL } from '../../services/global';
import { Publication } from '../../../models/publication';
import { User } from '../../../models/user';

@Component({
  selector: 'app-publication-view',
  templateUrl: './publication-view.page.html',
  styleUrls: ['./publication-view.page.scss'],
  providers: [UserService, PublicationsService]
})
export class PublicationViewPage implements OnInit {
  public identity;
  public stats: any;
  public url: string;
  public user: User;
  public token;
  public status;
  public publication: Publication;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _publicationsService: PublicationsService
    ) {
    this.url = GLOBAL.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.stats = this._userService.getStats();
  }

  ngOnInit() {
    console.log("Página de ver la publicación cargada...");
    this.loadPage();
  }

  loadPage() {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this.getPublication(id);
    });
  }

  getPublication(id) {
    this._publicationsService.getPublication(this.token, id).subscribe(
      (response) => {
        if(response.publication) {
          this.publication = response.publication;
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

}
