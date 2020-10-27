import { Component, DoCheck } from '@angular/core';
import { UserService } from '../../services/user.service';

import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [UserService]
})
export class HomePage implements DoCheck {
  public identity;
  public url: string;

  constructor(private _userService: UserService) {
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    //console.log(this.identity);
  }

  ngDoCheck() {
    this.identity = this._userService.getIdentity();
  }

}
