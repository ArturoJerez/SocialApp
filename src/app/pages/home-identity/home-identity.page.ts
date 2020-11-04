import { Component, DoCheck, EventEmitter, OnInit, Output } from '@angular/core';
import * as $ from 'jquery';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../../services/user.service';
import { PublicationsService } from '../../services/publications.service';
import { UploadService } from '../../services/upload.service';

import { GLOBAL } from '../../services/global';
import { Publication } from '../../../models/publication';

@Component({
  selector: 'app-home-identity',
  templateUrl: './home-identity.page.html',
  styleUrls: ['./home-identity.page.scss'],
  providers: [UserService, PublicationsService, UploadService]
})
export class HomeIdentityPage implements OnInit, DoCheck {
  public identity;
  public stats: any;
  public url: string;
  public token;
  public status;
  public publication: Publication;
  public page;
  public total;
  public pages;
  public items_per_page;
  public publications: Publication[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _publicationsService: PublicationsService,
    private _uploadService: UploadService
    ) {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.stats = this._userService.getStats();
    this.url = GLOBAL.url;
    this.publication = new Publication("", "", "", "", this.identity._id);
    this.page = 1;
  }

  ngOnInit(): void {
    console.log('Página principal cargada...');
    this.getPublications(this.page);
  }

  ngDoCheck() {
    this.identity = this._userService.getIdentity();
    this.stats = this._userService.getStats();
  }

  onSubmit(form) {
    this._publicationsService.addPublication(this.token, this.publication).subscribe(
      (response) => {
        if(response.publication) {

          // Subir imagen
          this._uploadService.makeFileRequest(this.url+'upload-image-pub/'+response.publication._id, [], this.filesToUpload, this.token, 'image')
                            .then((result: any) => {
                              this.publication.file = result.image;
                              this.status = 'success';
                              form.reset();
                              this._router.navigate(['/home-identity']);
                            });
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

  getPublications(page, adding = false) {
    this._publicationsService.getPublications(this.token, page).subscribe(
      (response) => {
        if(response.publications) {
          this.total = response.total_items;
          this.pages = response.pages;
          this.items_per_page = response.items_per_page;

          if(!adding) {
            this.publications = response.publications;
          } else {
            var arrayA = this.publications;
            var arrayB = response.publications;
            this.publications = arrayA.concat(arrayB);

            $("html, body").animate({scrollTop: $('body').prop("scrollHeight")}, 500);
          }

          if(page > this.pages) {
            this._router.navigate(['/home-identity']);
          }

          this.status = 'success';
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

  public noMore = false;
  viewMore() {
    this.page += 1;
    if(this.page == this.pages) {
      this.noMore = true;
    }

    this.getPublications(this.page, true);
  }

  refresh(event) {
    this.getPublications(1);
  }

  loadData(event) {
    setTimeout(() => {
      this.page += 1;
      if(this.page == this.pages) {
        this.noMore = true;
      }

      event.target.complete();
      this.getPublications(this.page, true);
    }, 1000);
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
