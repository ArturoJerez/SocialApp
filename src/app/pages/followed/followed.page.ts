import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { User } from '../../../models/user';
import { Follow } from '../../../models/follow';

import { UserService } from '../../services/user.service';
import { FollowService } from '../../services/follow.service';

import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-followed',
  templateUrl: './followed.page.html',
  styleUrls: ['./followed.page.scss'],
  providers: [UserService, FollowService]
})
export class FollowedPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public title: string;
  public identity;
  public token;
  public status: string;
  public url: string;
  public user_page_id;

  public page;
  public next_page;
  public prev_page;
  public total;
  public pages;
  public users: User[];
  public user: User;
  public follows;
  public followed;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _followService: FollowService

  ) {
    this.title = "Seguidores de";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log("Página de gente funcionando...");
    this.actualPage();
  }

  actualPage() {
    this._route.params.subscribe(params => {
      let user_id = params['id'];
      this.user_page_id = user_id;
      let page = +params['page'];
      this.page = page;

      if(!params['page']) {
        page = 1;
      }

      if(!page) {
        page = 1;
      } else {
        this.next_page = page + 1;
        this.prev_page = page - 1;

        if(this.prev_page <= 0) {
          this.prev_page  = 1;
        }
      }

      // Devolver listado de usuarios
      this.getUser(user_id, page);
    });
  }

  getFollows(user_id, page) {
    this._followService.getFollowed(this.token, user_id, page).subscribe(
      response => {
        if(!response.follows) {
          this.status = 'error';
        } else {
          console.log(response);
          this.total = response.total;
          this.followed = response.follows;
          this.pages = response.pages;
          this.follows = response.users_following;

          this.status = 'success';
          page > this.pages ? this._router.navigate(['/siguiendo', this.user_page_id, 1]) : console.log(this.pages);
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

  public followsUserOver;
  touchedEnter(user_id) {
    this.followsUserOver = user_id;
  }

  touchedLeave(user_id) {
    this.followsUserOver = 0;
  }

  followUser(followed) {
    var follow = new Follow('', this.identity._id, followed);
    this._followService.addFollow(this.token, follow).subscribe(
      (response) => {
        if(!response.follow) {
          this.status = 'error';
        } else {
          this.status = 'success';
          this.follows.push(followed);
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

  unfollowuser(followed) {
    this._followService.deleteFollow(this.token, followed).subscribe(
      (response) => {
        var search = this.follows.indexOf(followed);
        if(search != -1) {
          this.follows.splice(search, 1);
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

  getUser(user_id, page) {
    this._userService.getUser(user_id).subscribe(
      (response) => {
        if(response.user) {
          this.user = response.user;
          this.getFollows(user_id, page);
        } else {
          this._router.navigate(['/home-identity']);
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

  loadData(event) {
      setTimeout(() => {
        this._route.params.subscribe(params => {
          for(var i = 1; i <= this.pages; i++) {
            this.page = i+1;
            if(this.page > this.pages) {
              event.target.disabled = true;
            } else {
              // Devolver listado de usuarios
              console.log("Cargando más usuarios...");
              this._followService.getFollowing(this.token, this.user_page_id, this.page).subscribe(
                response => {
                  if(!response.follows) {
                    this.status = 'error';
                  } else {
                    this.status = 'success';
                    this.users.push(...response.follows);
                  }
                },
                error => {
                  var errorMessage = <any>error;
                  console.log(errorMessage);
          
                  if(errorMessage != null) {
                    this.status = 'error';
                  }
                });
            }
          }
        });
        event.target.complete();
      }, 1000);

  }

}
