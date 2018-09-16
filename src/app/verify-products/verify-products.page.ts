import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild
} from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { VerifyProductsPopover } from "./verify-products-popover";
import { ProductsComponent } from "../shared/components/products/products.component";

@Component({
  selector: "app-verify-products",
  templateUrl: "./verify-products.page.html",
  styleUrls: ["./verify-products.page.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerifyProductsPage implements OnInit {
  @ViewChild(ProductsComponent)
  products: ProductsComponent;
  currentStatus:string="pending";
  constructor(public popoverController: PopoverController) {}

  ngOnInit() {
    this.products.onFilter(this.currentStatus);
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: VerifyProductsPopover,
      componentProps:{
        currentStatus:this.currentStatus
      },
      event: event,
      translucent: true
    });
    popover.onWillDismiss(res => {
      if (res.data) {
        this.onFilter(res.data);
      }
    });

    return await popover.present();
  }

  onFilter(value: string) {
    this.currentStatus=value;
    this.products.onFilter(value);
  }
}
