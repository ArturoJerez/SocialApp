import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { IonicModule } from '@ionic/angular';

import { HomeIdentityPageRoutingModule } from './home-identity-routing.module';
import { ExploreContainerComponentModule } from '../../components/explore-container/explore-container.module';

import { HomeIdentityPage } from './home-identity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MomentModule,
    ExploreContainerComponentModule,
    HomeIdentityPageRoutingModule
  ],
  declarations: [HomeIdentityPage]
})
export class HomeIdentityPageModule {}
