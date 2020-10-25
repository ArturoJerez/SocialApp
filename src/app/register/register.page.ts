import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user'; // Modelo USER
import { UserService } from '../services/user.service'; // Servicio USER

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  providers: [UserService]
})
export class RegisterPage implements OnInit {

  public title: string;
  public user: User;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService
  ) {
    this.title = "Registrarse";
    this.user = new User("", "", "", "", "", "", "ROLE_USER", ""); // Creo un usuario vacío
  }

  ngOnInit() {
    console.log("Página de registro funcionando...");
  }

  onSubmit(registerForm) {
    console.log(this.user);
    this._userService.register(this.user).subscribe(
      (response: any) => {
        if(response.user && response.user._id) {
          console.log(response.user);
          this.status = 'success';
          registerForm.reset();
        } else {
          this.status = 'error';
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

}
