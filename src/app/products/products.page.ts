import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { ProductsComponent } from "../shared/components/products/products.component";
import { AuthService } from "../shared/services";
import { User } from "../shared/models/user";
import { UserRole } from "../shared/models/user-role";
import { takeWhile } from "rxjs/operators";

@Component({
  selector: "app-products-tab",
  templateUrl: "./products.page.html",
  styleUrls: ["./products.page.scss"]
})
export class ProductsPage implements OnInit,OnDestroy {
  ngOnDestroy(): void {
    this.alive=false;
  }
  @ViewChild(ProductsComponent)
  product: ProductsComponent;
  alive:boolean=true;
  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.auth.currentUser$
    .pipe(takeWhile(()=>this.alive))
    .subscribe((user: User) => {
      if (user && user.Role === UserRole.Farmer) {
        this.product.getByUser(user.Id);
      }
    });
  }
  onSearch(e) {
    if (e["detail"] && e["detail"].value) {
      this.product.onSearch(e["detail"].value);
    } else this.product.ngOnInit();
  }
}
