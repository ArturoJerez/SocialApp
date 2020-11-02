import { Component } from '@angular/core';

import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public url: string;

  constructor() {
    this.url = GLOBAL.url;
  }

}
