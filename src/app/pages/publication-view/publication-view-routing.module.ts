import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicationViewPage } from './publication-view.page';

const routes: Routes = [
  {
    path: '',
    component: PublicationViewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicationViewPageRoutingModule {}
