import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReportingFormComponent } from "./reporting-form/reporting-form.component";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { GoogleMapsComponent } from "./google-maps/google-maps.component";
import { LocationModalComponent } from "./location-modal/location-modal.component";
import { ProductsComponent } from "./products/products.component";
import { KhMapsModule } from "../../../libs/kh-maps/src/public_api";
import { LocationDirective } from "../location.directive";
import { Base64Pipe } from "../base64.pipe";
import { RouterModule } from "@angular/router";
import { RatingsModule } from "../../ratings/ratings.module";

@NgModule({
  imports: [CommonModule, IonicModule, FormsModule, KhMapsModule,RouterModule,RatingsModule],
  declarations: [
    ReportingFormComponent,
    GoogleMapsComponent,
    LocationModalComponent,
    ProductsComponent,
    LocationDirective,
    Base64Pipe
  ],
  exports: [
    ReportingFormComponent,
    GoogleMapsComponent,
    LocationModalComponent,
    ProductsComponent,
    LocationDirective,
    Base64Pipe
  ],
  entryComponents: [ReportingFormComponent, LocationModalComponent]
})
export class ComponentsModule {}
