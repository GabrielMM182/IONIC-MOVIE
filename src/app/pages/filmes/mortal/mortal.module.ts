import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MortalPageRoutingModule } from './mortal-routing.module';

import { MortalPage } from './mortal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MortalPageRoutingModule
  ],
  declarations: [MortalPage]
})
export class MortalPageModule {}
