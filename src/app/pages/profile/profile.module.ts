import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';
import { PublicationsComponent } from '../../components/publications/publications.component';

import { ProfilePage } from './profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MomentModule,
    ProfilePageRoutingModule
  ],
  declarations: [ProfilePage, PublicationsComponent],
  exports: [PublicationsComponent]
})
export class ProfilePageModule {}
