import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { AboutPageModule } from '../about/about.module';
import { DeviceDataPageModule } from '../device-data/device-data.module';
import { RecycleFormPageModule } from '../recycle-form/recycle-form.module';
import { ProductsPageModule } from '../products/products.module';
import { OrdersPageModule } from '../orders/orders.module';
import { SettingsPageModule } from '../settings/settings.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPageRoutingModule,
    DeviceDataPageModule,
    AboutPageModule,
    RecycleFormPageModule,
    OrdersPageModule,
    ProductsPageModule,
    SettingsPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
