import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagesReceivedPage } from './messages-received.page';

const routes: Routes = [
  {
    path: '',
    component: MessagesReceivedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagesReceivedPageRoutingModule {}
