import { Component, DoCheck } from '@angular/core';
import { UserService } from '../../services/user.service';

import { GLOBAL } from '../../services/global';
import { Publication } from '../../../models/publication';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [UserService]
})
export class HomePage implements DoCheck {
  public identity;
  public stats: any;
  public url: string;
  public token;
  public status;
  public publication: Publication;

  constructor(
    private _userService: UserService
    ) {
    this.url = GLOBAL.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.stats = this._userService.getStats();
    this.publication = new Publication("", "", "", "", this.identity._id);
  }

  ngOnInit(): void {
    console.log('Página principal cargada...');
  }

  ngDoCheck() {
    this.identity = this._userService.getIdentity();
    this.stats = this._userService.getStats();
  }

  onSubmit() {
    console.log(this.publication);
  }

}
