import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user'; // Modelo
import { GLOBAL } from './global'; // URL API

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  addFollow(token, follow): Observable<any> {
    let params = JSON.stringify(follow);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                  .set('Authorization', token);
    return this._http.post(this.url+'follow', params, {headers: headers});
  }

  deleteFollow(token, id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                  .set('Authorization', token);
    return this._http.delete(this.url+'follow/'+id, {headers: headers});
  }

}
