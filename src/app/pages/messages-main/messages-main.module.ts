import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessagesMainPageRoutingModule } from './messages-main-routing.module';
import { ExploreContainerComponentModule } from '../../explore-container/explore-container.module';

import { MessagesMainPage } from './messages-main.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    MessagesMainPageRoutingModule
  ],
  declarations: [MessagesMainPage]
})
export class MessagesMainPageModule {}
