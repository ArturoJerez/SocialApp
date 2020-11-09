import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';

import { IonicModule } from '@ionic/angular';

import { MessagesSendedPageRoutingModule } from './messages-sended-routing.module';

import { MessagesSendedPage } from './messages-sended.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MomentModule,
    MessagesSendedPageRoutingModule
  ],
  declarations: [MessagesSendedPage]
})
export class MessagesSendedPageModule {}
