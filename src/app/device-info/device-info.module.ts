import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ComponentsModule } from "../shared";
import { IonicModule } from '@ionic/angular';

import { DeviceInfoPage } from './device-info.page';

const routes: Routes = [
  {
    path: '',
    component: DeviceInfoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DeviceInfoPage]
})
export class DeviceInfoPageModule { }
