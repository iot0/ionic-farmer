import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VerifyProductsPage } from './verify-products.page';
import { SharedModule } from '../shared';
import { VerifyProductsPopover } from './verify-products-popover';

const routes: Routes = [
  {
    path: '',
    component: VerifyProductsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VerifyProductsPage,VerifyProductsPopover],
  entryComponents:[VerifyProductsPopover]
})
export class VerifyProductsPageModule {}
