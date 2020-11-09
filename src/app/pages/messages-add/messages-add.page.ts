import { Component, OnInit } from '@angular/core';

import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-messages-add',
  templateUrl: './messages-add.page.html',
  styleUrls: ['./messages-add.page.scss'],
})
export class MessagesAddPage implements OnInit {
  public url: string;
  public title: string;

  constructor() {
    this.title = 'Enviar mensajes';
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log("Página de enviar cargado...");
  }

}
