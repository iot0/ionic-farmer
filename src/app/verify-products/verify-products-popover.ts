import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";

@Component({
  selector: "app-verify-products-popover",
  template: `
         <ion-button [fill]="currentStatus==='pending'?'solid':'clear'" expand="block" (click)='onClose("pending")'>Pending</ion-button>
         <ion-button [fill]="currentStatus==='approved'?'solid':'clear'" expand="block" (click)='onClose("approved")'>Approved</ion-button>
         <ion-button [fill]="currentStatus==='rejected'?'solid':'clear'" expand="block" (click)='onClose("rejected")'>Rejected</ion-button>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerifyProductsPopover implements OnInit {
  currentStatus = "pending";
  ngOnInit(): void {}

  constructor(public popoverController: PopoverController) {}

  onClose(filter: string) {
    this.popoverController.dismiss(filter);
  }
}
