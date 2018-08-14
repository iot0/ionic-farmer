import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';
import { HomePage } from '../home/home.page';
import { AboutPage } from '../about/about.page';
import { ContactPage } from '../contact/contact.page';
import { DeviceDataPage } from '../device-data/device-data.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'device',
        outlet: 'device',
        component: DeviceDataPage
      },
      {
        path: 'about',
        outlet: 'about',
        component: AboutPage
      }
    ]
  },
  {
    path: '',
    redirectTo: '/user/tabs/(device:device)',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
