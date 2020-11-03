import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../../models/user'; // Modelo USER
import { UserService } from '../../services/user.service'; // Servicio USER
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [UserService]
})
export class LoginPage implements OnInit {

  public title: string;
  public user: User;
  public status: string;
  public identity;
  public token;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    public toastController: ToastController
  ) {
    this.title = "Identificate";
    this.user = new User("", "", "", "", "", "", "ROLE_USER", ""); // Creo un usuario vacío
  }

  ngOnInit() {
    console.log("Página de login funcionando...");
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Has iniciado sesión correctamente',
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  async presentToastError() {
    const toast = await this.toastController.create({
      message: 'Correo o contraseña incorrectas',
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  onSubmit() {
    console.log(this.user);
    this._userService.signup(this.user).subscribe( // loguear usuario
      (response: any) => {
        this.identity = response.user;
        console.log(this.identity);
        if(!this.identity && !this.identity._id) {
          this.status = 'error';
        } else {
          this.presentToast();
          // Persistir datos del usuario en almacenamiento local
          localStorage.setItem('identity', JSON.stringify(this.identity));

          // Conseguir el token del usuario
          this.getToken();
        }
      },
      (error: any) => {
        var errorMessage = <any>error;
        console.log(errorMessage);

        if(errorMessage != null) {
          this.status = 'error';
          this.presentToastError();
        }
      }
    );
  }

  getToken() {
    this._userService.signup(this.user, 'true').subscribe( // loguear usuario
      (response: any) => {
        this.token = response.token;
        console.log(this.token);
        if(this.token.length <= 0) {
          this.status = 'error';
        } else {
          // Persistir Token del usuario
          localStorage.setItem('token', JSON.stringify(this.token));

          // Conseguir los contadores o estadisticas del usuario
          this.getCounters();
        }
      },
      (error: any) => {
        var errorMessage = <any>error;
        console.log(errorMessage);

        if(errorMessage != null) {
          this.status = 'error';
        }
      }
    );
  }

  getCounters() {
    this._userService.getCounters().subscribe(
      (response) => {
        console.log(response);
        localStorage.setItem('stats', JSON.stringify(response));
        this.status = 'success';
        this._router.navigate(['/home-identity']);
      },
      (error) => {
        console.log(<any>error);
        this.status = 'error';
      }
    )
  }

}
