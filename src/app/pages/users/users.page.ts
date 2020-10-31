import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../../models/user';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  providers: [UserService]
})
export class UsersPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public title: string;
  public identity;
  public token;
  public status: string;
  public url: string;

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
    private _userService: UserService

  ) {
    this.title = "Gente";
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
    for (let i = 7; i < this.total?.length; i++) {
      this.users.push(...this.users);
    }
  }

  ngOnInit() {
    console.log("Página de gente funcionando...");
    this.actualPage();
    //this.addMoreUsers();
  }

  actualPage() {
    this._route.params.subscribe(params => {
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
      this.getUsers(page);
    });
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
          page > this.pages ? this._router.navigate(['/gente']) : console.log(this.pages);
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

  /*addMoreUsers() {
    for (let i = 7; i < this.total?.length; i++) {
      this.users.push(...this.users);
    }
  }*/

  public followsUserOver;
  touchedEnter(user_id) {
    this.followsUserOver = user_id;
  }

  touchedLeave(user_id) {
    this.followsUserOver = 0;
  }

  loadData(event) {
    setTimeout(() => {
      console.log("Cargando más usuarios...");
      for (let i = 7; i < this.total?.length; i++) {
        this.users.push(...this.users);
      }

      if(event) {
        event.target.complete();
      }

      if (this.users.length == this.total.length) {
        event.target.disabled = true;
      }
    }, 600);
  }

}
