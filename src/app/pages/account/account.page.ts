import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ToastController } from '@ionic/angular';
import { GLOBAL } from '../../services/global';

// MODELO USER
import { User } from '../../../models/user';

// SERVICIOS
import { UserService } from '../../services/user.service';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
  providers: [UserService, UploadService]
})
export class AccountPage implements OnInit {
  public title: string;
  public user: User;
  public identity;
  public token;
  public status: string;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    public toastController: ToastController,
    private _uploadService: UploadService
  ) {
    this.title = 'Mis Datos';
    this.user = this._userService.getIdentity();
    this.identity = this.user;
    this.token = this._userService.getToken();
    this.url = GLOBAL.url;
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
          this._uploadService.makeFileRequest(this.url+'upload-image-user/'+this.user._id, [], this.filesToUpload, this.token, 'image')
                      .then((result: any) => {
                        console.log(result);
                        this.user.image = result.user.image;
                        localStorage.setItem('identity', JSON.stringify(this.user));
                      });
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

  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }

}
