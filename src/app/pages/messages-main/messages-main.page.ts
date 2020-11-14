import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';

import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-messages-main',
  templateUrl: './messages-main.page.html',
  styleUrls: ['./messages-main.page.scss'],
})
export class MessagesMainPage implements OnInit {
  public identity;
  public stats: any;
  public token;
  public url: string;
  public title: string;

  constructor(
    private _userService: UserService,
  ) {
    this.title = 'Chats';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.stats = this._userService.getStats();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log('Página principal de chats cargada...');
  }

}
