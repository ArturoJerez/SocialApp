import { Component } from '@angular/core';

import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public url: string;

  constructor() {
    this.url = GLOBAL.url;
  }

}
