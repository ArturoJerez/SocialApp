import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicationViewPageRoutingModule } from './publication-view-routing.module';

import { PublicationViewPage } from './publication-view.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicationViewPageRoutingModule
  ],
  declarations: [PublicationViewPage]
})
export class PublicationViewPageModule {}
