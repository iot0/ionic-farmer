import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ProductFormPage } from './product-form.page';
import { ComponentsModule } from '../shared/components/components.module';
import { ProductResolver } from '../shared/components/products/product-resolver';

const routes: Routes = [
  {
    path: '',
    component: ProductFormPage
  },
  {
    path: ':id',
    component: ProductFormPage,
    resolve: {
      data: ProductResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProductFormPage]
})
export class ProductFormPageModule {}
