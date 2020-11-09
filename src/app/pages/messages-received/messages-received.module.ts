import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessagesReceivedPageRoutingModule } from './messages-received-routing.module';

import { MessagesReceivedPage } from './messages-received.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessagesReceivedPageRoutingModule
  ],
  declarations: [MessagesReceivedPage]
})
export class MessagesReceivedPageModule {}
