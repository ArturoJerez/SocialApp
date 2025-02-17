import { Injectable } from '@angular/core'; // Define los servicios
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url: string;
  public identity;
  public token;
  public stats: any;
  public user: User;

  constructor(public _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  register(user: User): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    return this._http.post(this.url+'register', params, {headers: headers});
  }

  signup(user: User, gettoken = null): Observable<any> {
    if(gettoken != null) {
      user.gettoken = gettoken;
    }
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(this.url+'login', params, {headers: headers});
  }

  getIdentity() { // Datos del usuario identificado
    let identity = JSON.parse(localStorage.getItem('identity'));
    if(identity != "undefined") {
      this.identity = identity;
    } else {
      this.identity = null;
    }

    return this.identity;
  }

  getToken() { // Token del usuario identificado
    let token = JSON.parse(localStorage.getItem('token'));
    if(token != "undefined") {
      this.token = token;
    } else {
      this.token = null;
    }

    return this.token;
  }

  getStats() {
    let stats = JSON.parse(localStorage.getItem('stats'));
    if(stats != undefined) {
      this.stats = stats;
    } else {
      this.stats = null;
    }
    return this.stats;
  }

  getCounters(userId = null): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', this.getToken());
    if(userId != null) {
      return this._http.get(this.url+'counters/'+userId, {headers: headers});
    } else {
      return this._http.get(this.url+'counters/', {headers: headers});
    }
  }

  updateUser(user: User): Observable<any> {
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                  .set('Authorization', this.getToken());

    return this._http.put(this.url+'update-user/'+user._id, params, {headers: headers});
  }

  getUsers(page = null): Observable<any> { // Muestra la información de todos los usuarios
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', this.getToken());
    return this._http.get(this.url+'users/'+page, {headers: headers});
  }

  getUser(id): Observable<any> { // Muestra la información de un usuario
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', this.getToken());
    return this._http.get(this.url+'user/'+id, {headers: headers});
  }

}
