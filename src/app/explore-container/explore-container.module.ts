import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponent } from './explore-container.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [
    ExploreContainerComponent,
    LoginComponent,
    RegisterComponent
  ],
  exports: [ExploreContainerComponent]
})
export class ExploreContainerComponentModule {}
