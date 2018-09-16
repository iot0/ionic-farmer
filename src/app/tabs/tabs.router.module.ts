import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TabsPage } from "./tabs.page";
import { AboutPage } from "../about/about.page";
import { DeviceDataPage } from "../device-data/device-data.page";
import { ProductsPage } from "../products/products.page";
import { SettingsPage } from "../settings/settings.page";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "device",
        outlet: "device",
        component: DeviceDataPage
      },
      {
        path: "about",
        outlet: "about",
        component: AboutPage
      },
      {
        path: "products",
        outlet:"products",
        component:ProductsPage
      },
      {
        path: "settings",
        outlet: "settings",
        component: SettingsPage
      },
      {
        path: "",
        redirectTo: "/user/tabs/(products:products)",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "",
    redirectTo: "/user/tabs/(products:products)",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
