import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  constructor() {}

  ngOnInit() {
    console.log('Página principal de chats cargada...');
  }

}
