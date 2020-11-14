import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessagesAddPageRoutingModule } from './messages-add-routing.module';

import { MessagesAddPage } from './messages-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessagesAddPageRoutingModule
  ],
  declarations: [MessagesAddPage]
})
export class MessagesAddPageModule {}
