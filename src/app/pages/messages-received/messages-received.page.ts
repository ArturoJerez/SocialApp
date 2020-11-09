import { Component, OnInit } from '@angular/core';

import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-messages-received',
  templateUrl: './messages-received.page.html',
  styleUrls: ['./messages-received.page.scss'],
})
export class MessagesReceivedPage implements OnInit {
  public url: string;
  public title: string;

  constructor() {
    this.title = 'Mensajes recibidos';
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log("Página de recibidos cargado...");
  }

}
