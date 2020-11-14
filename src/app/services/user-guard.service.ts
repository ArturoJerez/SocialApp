import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuardService implements CanActivate {

  constructor(
    private _router: Router,
    private _userService: UserService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let identity = this._userService.getIdentity();
    if(identity && (identity.role == 'ROLE_USER' || identity.role == 'ROLE_ADMIN')) {
      return true;
    } else {
      this._router.navigate(['/login']);
      return false;
    }
  }

}
