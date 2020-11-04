import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

// Modelos
import { User } from '../../../models/user';
import { Follow } from '../../../models/follow';
import { Publication } from '../../../models/publication';

// Servicios
import { UserService } from '../../services/user.service';
import { FollowService } from '../../services/follow.service';
import { PublicationsService } from '../../services/publications.service';

import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  providers: [UserService, PublicationsService]
})
export class ProfilePage implements OnInit {
  public title: string;
  public user: User;
  public status: string;
  public identity;
  public token;
  public url: string;
  public stats;
  public followed;
  public following;
  public publications: Publication[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _followService: FollowService
  ) {
    this.title = "Pérfil";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    this.followed = false;
    this.following = false;
    this._router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    console.log("Pérfil de usuario cargado...");
    this.loadPage();
  }

  loadPage() {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this.getUser(id);
      this.getCounters(id);
    });
  }

  getUser(id) {
    this._userService.getUser(id).subscribe(
      (response) => {
        if(response.user) {
          this.user = response.user;

          if(response.following && response.following._id) {
            this.following = true;
          } else {
            this.following = false;
          }

          if(response.followed && response.followed._id) {
            this.followed = true;
          } else {
            this.followed = false;
          }

          this.status = 'success';
        } else {
          this.status = 'error';
        }
      }, (error) => {
        var errorMessage = <any>error;
        console.log(errorMessage);

        if(errorMessage != null) {
          this.status = 'error';
          this._router.navigate(['/profile', this.identity._id]);
        }
      }
    )
  }

  getCounters(id) {
    this._userService.getCounters(id).subscribe(
      (response) => {
        this.stats = response;
      }, (error) => {
        var errorMessage = <any>error;
        console.log(errorMessage);

        if(errorMessage != null) {
          this.status = 'error';
        }
      }
    )
  }

  public followsUserOver;
  touchedEnter(user_id) {
    this.followsUserOver = user_id;
  }

  touchedLeave(user_id) {
    this.followsUserOver = 0;
  }

  followUser(followed) { // Seguir a un usuario
    var follow = new Follow('', this.identity._id, followed);

    this._followService.addFollow(this.token, follow).subscribe(
      (response) => {
        this.following = true;
      }, (error) => {
        var errorMessage = <any>error;
        console.log(errorMessage);

        if(errorMessage != null) {
          this.status = 'error';
        }
      }
    )
  }

  unfollowUser(followed) { // Dejar de seguir a un usuario
    this._followService.deleteFollow(this.token, followed).subscribe(
      (response) => {
        this.following = false;
      }, (error) => {
        var errorMessage = <any>error;
        console.log(errorMessage);

        if(errorMessage != null) {
          this.status = 'error';
        }
      }
    )
  }

}
