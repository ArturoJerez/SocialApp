import { Component, OnInit } from '@angular/core';

import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-messages-sended',
  templateUrl: './messages-sended.page.html',
  styleUrls: ['./messages-sended.page.scss'],
})
export class MessagesSendedPage implements OnInit {
  public url: string;
  public title: string;

  constructor() {
    this.title = 'Mensajes enviados';
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log("Página de enviados cargado...");
  }

}
