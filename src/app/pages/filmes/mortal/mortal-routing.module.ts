import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MortalPage } from './mortal.page';

const routes: Routes = [
  {
    path: '',
    component: MortalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MortalPageRoutingModule {}
