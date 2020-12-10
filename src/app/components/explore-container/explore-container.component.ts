import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AppComponent } from '../../app.component';

import { ActivatedRoute, Router } from '@angular/router';

import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss']
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;
  @Input() title: string;
  public identity;
  public url: string;

  constructor(
    private _userService: UserService,
    public app: AppComponent,
    private _route: ActivatedRoute,
    private _router: Router
    ) {
      this.url = GLOBAL.url;
    }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
  }

  logout_container() {
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/']);
  }

}
