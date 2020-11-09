import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagesSendedPage } from './messages-sended.page';

const routes: Routes = [
  {
    path: '',
    component: MessagesSendedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagesSendedPageRoutingModule {}
