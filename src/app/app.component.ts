import { Component, OnInit, DoCheck } from '@angular/core';
import { UserService } from './services/user.service';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ActivatedRoute, Router } from '@angular/router';

import { GLOBAL } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
  public identity;
  public stats;
  public token;
  public url: string;
  public status;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public menu: MenuController,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.initializeApp();
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.stats = this._userService.getStats();
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {
    console.log("Página sidebar cargado...");
  }

  ngDoCheck() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.stats = this._userService.getStats();
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
  logout() {
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/']);
  }
}
