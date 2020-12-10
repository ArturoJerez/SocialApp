import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user'; // Modelo
import { GLOBAL } from './global'; // URL API

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  addPublication(token, publication): Observable<any> {
    let params = JSON.stringify(publication);
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', token);
    return this._http.post(this.url+'publication', params, {headers: headers});
  }

  getPublications(token, page = 1): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', token);
    return this._http.get(this.url+'publications/'+page, {headers: headers});
  }

  getPublication(token, id): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', token);
    return this._http.get(this.url+'publication-view/'+id, {headers: headers});
  }

  getPublicationsUser(token, user_id, page = 1): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', token);
    return this._http.get(this.url+'publications-user/'+user_id+'/'+page, {headers: headers});
  }

  deletePublication(token, idPublication): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                    .set('Authorization', token);
    return this._http.delete(this.url+'publication/'+idPublication, {headers: headers});
  }
  
}
