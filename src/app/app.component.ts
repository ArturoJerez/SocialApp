import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
  public identity;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public menu: MenuController,
    private _userService: UserService
  ) {
    this.initializeApp();
  }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    console.log(this.identity);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  ngDoCheck() {
    this.identity = this._userService.getIdentity();
  }
}
