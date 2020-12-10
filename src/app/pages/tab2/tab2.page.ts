import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from '../../../models/user';
import { Follow } from '../../../models/follow';

import { UserService } from '../../services/user.service';
import { FollowService } from '../../services/follow.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public url: string;
  public identity;
  public token;
  public status: string;

  public page;
  public next_page;
  public prev_page;
  public total;
  public pages;
  public users: User[];
  public user: User;
  public follows;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _followService: FollowService,

  ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log("Página de buscar funcionando...");
    this.getUsers(this.page);
  }

  getUsers(page) {
    this._userService.getUsers(page).subscribe(
      response => {
        if(!response.users) {
          this.status = 'error';
        } else {
          console.log(response);
          this.total = response.total;
          this.users = response.users;
          this.pages = response.pages;
          this.follows = response.users_following;

          this.status = 'success';
          page > this.pages ? this._router.navigate(['/tabs/chats']) : console.log(this.pages);
        }
      },
      error => {
        var errorMessage = <any>error;
        console.log(errorMessage);

        if(errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

}
