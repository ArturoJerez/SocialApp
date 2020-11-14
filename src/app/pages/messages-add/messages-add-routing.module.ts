import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagesAddPage } from './messages-add.page';

const routes: Routes = [
  {
    path: '',
    component: MessagesAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagesAddPageRoutingModule {}
