import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReviewComponent } from "./review.component";
import { Routes } from "@angular/router";
import { ReviewResolver } from "./review-resolver";
import { RatingsModule } from "../ratings/ratings.module";
import { ReviewFormModalComponent } from './review-form-modal/review-form-modal.component';

const routes: Routes = [
  {
    path: ":id",
    component: ReviewComponent,
    resolve: {
      product: ReviewResolver
    }
  }
];

@NgModule({
  imports: [CommonModule,RatingsModule],
  declarations: [ReviewComponent, ReviewFormModalComponent],
  entryComponents:[ReviewFormModalComponent]
})
export class ReviewModule {}
