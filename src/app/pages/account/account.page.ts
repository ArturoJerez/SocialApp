import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ToastController } from '@ionic/angular';

// MODELO USER
import { User } from '../../../models/user';

// SERVICIO USER
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  providers: [UserService]
})
export class AccountPage implements OnInit {
  public title: string;
  public user: User;
  public identity;
  public token;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    public toastController: ToastController
  ) {
    this.title = 'Mis Datos';
    this.user = this._userService.getIdentity();
    this.identity = this.user;
    this.token = this._userService.getToken();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Datos de usuario actualizados',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  async presentToastError() {
    const toast = await this.toastController.create({
      message: 'No se han podido actualizar tus datos',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  ngOnInit() {
    console.log('Cuenta de Usuario esta funcionando...');
  }

  onSubmit() {
    console.log(this.user);
    this._userService.updateUser(this.user).subscribe(
      (response) => {
        if(!response.user) {
          this.status = 'error';
        } else {
          this.presentToast();
          this.status = 'success';
          localStorage.setItem('identity', JSON.stringify(this.user));
          this.identity = this.user;

          //SUBIDA IMAGEN DE USUARIO
        }
      },
      (error) => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if(errorMessage != null) {
          this.status = 'error';
        }
        this.presentToastError();
      }
    )
  }

}
