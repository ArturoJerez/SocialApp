import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { UserGuardService } from '../../services/user-guard.service';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'home-identity',
        loadChildren: () => import('../home-identity/home-identity.module').then(m => m.HomeIdentityPageModule),
        canActivate: [UserGuardService]
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'chats',
        loadChildren: () => import('../messages/messages.module').then(m => m.MessagesPageModule),
        canActivate: [UserGuardService],
        children: [
          {
            path: '',
            loadChildren: () => import('../messages-main/messages-main.module').then(m => m.MessagesMainPageModule)
          },
          {
            path: 'recibidos',
            loadChildren: () => import('../messages-received/messages-received.module').then(m => m.MessagesReceivedPageModule)
          },
          {
            path: 'recibidos/:page',
            loadChildren: () => import('../messages-received/messages-received.module').then(m => m.MessagesReceivedPageModule)
          },
          {
            path: 'enviar',
            loadChildren: () => import('../messages-add/messages-add.module').then(m => m.MessagesAddPageModule)
          },
          {
            path: 'enviados',
            loadChildren: () => import('../messages-sended/messages-sended.module').then(m => m.MessagesSendedPageModule)
          },
          {
            path: 'enviados/:page',
            loadChildren: () => import('../messages-sended/messages-sended.module').then(m => m.MessagesSendedPageModule)
          },
          {
            path: '',
            redirectTo: '/tabs/chats',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
