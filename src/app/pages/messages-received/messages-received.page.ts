import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Message } from '../../../models/message';
import { User } from '../../../models/user';
import { Follow } from '../../../models/follow';

import { MessageService } from '../../services/message.service';
import { UserService } from '../../services/user.service';
import { FollowService } from '../../services/follow.service';

import { GLOBAL } from '../../services/global';

@Component({
  selector: 'app-messages-received',
  templateUrl: './messages-received.page.html',
  styleUrls: ['./messages-received.page.scss'],
  providers: [MessageService, FollowService, UserService]
})
export class MessagesReceivedPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public url: string;
  public title: string;
  public messages: Message[];
  public identity;
  public token;
  public stats: any;
  public status;
  public follows;

  public page;
  public next_page;
  public prev_page;
  public total;
  public pages;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _messageService: MessageService,
    private _userService: UserService,
    private _followService: FollowService,
    public alertController: AlertController
  ) {
    this.title = 'Mensajes recibidos';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.stats = this._userService.getStats();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log("Página de recibidos cargado...");
    this.actualPage();
  }

  actualPage() {
    this._route.params.subscribe(params => {
      let page = +params['page'];
      this.page = page;

      if(!params['page']) {
        page = 1;
      }

      if(!page) {
        page = 1;
      } else {
        this.next_page = page + 1;
        this.prev_page = page - 1;

        if(this.prev_page <= 0) {
          this.prev_page  = 1;
        }
      }

      // Devolver listado de usuarios
      this.getMessages(this.token, this.page);
    });
  }

  getMessages(token, page) {
    this._messageService.getMessagesReceiver(token, page).subscribe(
      (response) => {
        if(response.messages) {
          this.messages = response.messages;
          this.total = response.total;
          this.pages = response.pages;
          this.status = 'success';

          page > this.pages ? this._router.navigate(['/tabs/chats/recibidos', 1]) : console.log(this.pages);
        }
      },
      (error) => {
        var errorMessage = <any>error;
        console.log(errorMessage);

        if(errorMessage != null) {
          this.status = 'error';
        }
      }
    )
  }

  loadData(event) {
    setTimeout(() => {
      this._route.params.subscribe(params => {
        for(var i = 1; i <= this.pages; i++) {
          this.page = i+1;
          if(this.page > this.pages) {
            event.target.disabled = true;
          } else {
            // Devolver listado de usuarios
            console.log("Cargando más mensajes recibidos...");
            this._messageService.getMessagesEmitt(this.token, this.page).subscribe(
              response => {
                if(!response.messages) {
                  this.status = 'error';
                } else {
                  this.status = 'success';
                  this.messages.push(...response.messages);
                }
              },
              error => {
                var errorMessage = <any>error;
                console.log(errorMessage);
        
                if(errorMessage != null) {
                  this.status = 'error';
                }
              });
          }
        }
      });
      event.target.complete();
    }, 1000);

  }

  /*async presentAlertConfirm(id) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¿Quieres eliminar este mensaje?',
      message: 'Si borras este mensaje, no podras <strong>recuperarlo</strong>.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancelado');
          }
        }, {
          text: 'Eliminar',
          cssClass: 'danger',
          handler: () => {
            console.log(id);
            //Eliminar mensajes
          }
        }
      ]
    });

    await alert.present();
  }*/

}
