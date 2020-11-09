import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessagesSendedPageRoutingModule } from './messages-sended-routing.module';

import { MessagesSendedPage } from './messages-sended.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessagesSendedPageRoutingModule
  ],
  declarations: [MessagesSendedPage]
})
export class MessagesSendedPageModule {}
