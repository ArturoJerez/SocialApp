import { Component, OnInit, DoCheck, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../../services/user.service';
import { PublicationsService } from '../../services/publications.service';
import { UploadService } from '../../services/upload.service';

import { GLOBAL } from '../../services/global';
import { Publication } from '../../../models/publication';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.page.html',
  styleUrls: ['./publication.page.scss'],
  providers: [UserService, PublicationsService, UploadService]
})
export class PublicationPage implements OnInit, DoCheck {
  public identity;
  public stats: any;
  public url: string;
  public token;
  public status;
  public publication: Publication;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _publicationsService: PublicationsService,
    private _uploadService: UploadService
    ) {
    this.url = GLOBAL.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.stats = this._userService.getStats();
    this.publication = new Publication("", "", "", "", this.identity._id);
  }
  
  ngDoCheck() {
    this.identity = this._userService.getIdentity();
    this.stats = this._userService.getStats();
  }

  ngOnInit() {
    console.log("Página de publicaciones cargado...");
  }

  onSubmit($event) {
    this._publicationsService.addPublication(this.token, this.publication).subscribe(
      (response) => {
        if(response.publication) {
          if(this.filesToUpload && this.filesToUpload.length) {
            // Subir imagen
            this._uploadService.makeFileRequest(this.url+'upload-image-pub/'+response.publication._id, [], this.filesToUpload, this.token, 'image')
              .then((result: any) => {
                this.publication.file = result.image;
                this.status = 'success';
                this._router.navigate(['/home-identity']);
                this.sended.emit({send:'true'});
              });
          } else {
            this.status = 'success';
            this._router.navigate(['/home-identity']);
            this.sended.emit({send:'true'});
          }
        } else {
          this.status = 'error';
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

  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  @Output() sended = new EventEmitter();
  sendPublication(event) {
    this.sended.emit({send:'true'});
  }

}
