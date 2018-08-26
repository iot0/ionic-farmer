import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TabsPage } from "./tabs.page";
import { AboutPage } from "../about/about.page";
import { DeviceDataPage } from "../device-data/device-data.page";
import { DeviceListPage } from "../device-list/device-list.page";
import { DeviceInfoPage } from "../device-info/device-info.page";
import { RecycleFormPage } from "../recycle-form/recycle-form.page";
import { ProductsPage } from "../products/products.page";
import { OrdersPage } from "../orders/orders.page";

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
        path: "device-list",
        outlet:"device-list",
        component:DeviceListPage
      },
      {
        path: "device-info",
        outlet:"device-list",
        component:DeviceInfoPage
      },
      {
        path: "recycle-form",
        outlet:"recycle-form",
        component:RecycleFormPage
      },
      {
        path: "products",
        outlet:"products",
        component:ProductsPage
      },
      {
        path: "orders",
        outlet:"orders",
        component:OrdersPage
      }
    ]
  },
  {
    path: "",
    redirectTo: "/user/tabs/(device:device)",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
