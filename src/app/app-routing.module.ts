import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductFormPage } from "./product-form/product-form.page";
import { ProductResolver } from "./shared/components/products/product-resolver";

const routes: Routes = [
  { path: "home", loadChildren: "./home/home.module#HomePageModule" },
  { path: "login", loadChildren: "./login/login.module#LoginModule" },
  {
    path: "register",
    loadChildren: "./register/register.module#RegisterPageModule"
  },
  { path: "about", loadChildren: "./about/about.module#AboutPageModule" },
  {
    path: "user",
    children: [{ path: "", loadChildren: "./tabs/tabs.module#TabsPageModule" }]
  },
  { path: "orders", loadChildren: "./orders/orders.module#OrdersPageModule" },
  {
    path: "signup-options",
    loadChildren:
      "./signup-options/signup-options.module#SignupOptionsPageModule"
  },
  {
    path: "register-user",
    loadChildren: "./register-user/register-user.module#RegisterUserPageModule"
  },
  {
    path: "register-farmer",
    loadChildren:
      "./register-farmer/register-farmer.module#RegisterFarmerPageModule"
  },
  { path: "admin", loadChildren: "./admin/admin.module#AdminPageModule" },
  {
    path: "settings",
    loadChildren: "./settings/settings.module#SettingsPageModule"
  },
  {
    path: "view-users/:role",
    loadChildren: "./view-users/view-users.module#ViewUsersPageModule"
  },
  {
    path: "verify-products",
    loadChildren:
      "./verify-products/verify-products.module#VerifyProductsPageModule"
  },
  {
    path: "product-form",
    loadChildren: "./product-form/product-form.module#ProductFormPageModule"
  },
  {
    path: "chats",
    loadChildren: "./chat/chat.module#ChatModule"
  },
  {
    path: "reviews",
    loadChildren: "./review/review.module#ReviewModule"
  },
  { path: "", pathMatch: "full", redirectTo: "home" }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
