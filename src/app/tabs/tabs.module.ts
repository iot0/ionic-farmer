import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { AboutPageModule } from '../about/about.module';
import { DeviceDataPageModule } from '../device-data/device-data.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    DeviceDataPageModule,
    AboutPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
