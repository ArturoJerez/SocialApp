import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicationPageRoutingModule } from './publication-routing.module';
import { ExploreContainerComponentModule } from '../../components/explore-container/explore-container.module';

import { PublicationPage } from './publication.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    IonicModule,
    PublicationPageRoutingModule
  ],
  declarations: [PublicationPage]
})
export class PublicationPageModule {}
