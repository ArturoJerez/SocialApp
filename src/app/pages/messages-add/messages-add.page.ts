import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Message } from '../../../models/message';
import { User } from '../../../models/user';
import { Follow } from '../../../models/follow';

import { MessageService } from '../../services/message.service';
import { UserService } from '../../services/user.service';
import { FollowService } from '../../services/follow.service';

import { GLOBAL } from '../../services/global';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-messages-add',
  templateUrl: './messages-add.page.html',
  styleUrls: ['./messages-add.page.scss'],
  providers: [MessageService, FollowService, UserService]
})
export class MessagesAddPage implements OnInit {
  public url: string;
  public title: string;
  public message: Message;
  public identity;
  public token;
  public stats: any;
  public status;
  public follows;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _messageService: MessageService,
    private _userService: UserService,
    private _followService: FollowService,
    public toastController: ToastController
  ) {
    this.title = 'Enviar mensajes';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.stats = this._userService.getStats();
    this.message = new Message('', '', '', '', this.identity._id, '');
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log("Página de enviar cargado...");
    this.getMyFollows();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Tu mensaje ha sido enviado correctamente',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  async presentToastError() {
    const toast = await this.toastController.create({
      message: 'No se ha podido enviar el mensaje',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  onSubmit(form) {
    this._messageService.addMessage(this.token, this.message).subscribe(
      (response) => {
        if(response.message) {
          this.status = 'success';
          form.reset();
          this.presentToast();
        }
        this._router.navigate(['/tabs/chats/enviados']);
      },
      (error) => {
        var errorMessage = <any>error;
        console.log(errorMessage);

        if(errorMessage != null) {
          this.status = 'error';
          this.presentToastError();
        }
      }
    )
  }

  getMyFollows() {
    this._followService.getMyFollows(this.token).subscribe(
      (response) => {
        this.follows = response.follows;
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

}
