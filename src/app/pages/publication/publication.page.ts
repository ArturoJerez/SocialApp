import { Component, OnInit, DoCheck } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../../services/user.service';
import { PublicationsService } from '../../services/publications.service';

import { GLOBAL } from '../../services/global';
import { Publication } from '../../../models/publication';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.page.html',
  styleUrls: ['./publication.page.scss'],
  providers: [UserService, PublicationsService]
})
export class PublicationPage implements OnInit, DoCheck {
  public identity;
  public stats: any;
  public url: string;
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
    this.publication = new Publication("", "", "", "", this.identity._id);
  }

  ngOnInit() {
    console.log("Página de publicaciones cargado...");
  }

  ngDoCheck() {
    this.identity = this._userService.getIdentity();
    this.stats = this._userService.getStats();
  }

  onSubmit() {
    this._publicationsService.addPublication(this.token, this.publication).subscribe(
      (response) => {
        if(response.publication) {
          this.status = 'success';
          this._router.navigate(['/home-identity']);
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
