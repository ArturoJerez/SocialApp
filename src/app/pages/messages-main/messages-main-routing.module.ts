import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagesMainPage } from './messages-main.page';

const routes: Routes = [
  {
    path: '',
    component: MessagesMainPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagesMainPageRoutingModule {}
