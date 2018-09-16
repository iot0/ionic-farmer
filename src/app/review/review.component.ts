import { Component, OnInit, ContentChild, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { map, catchError } from "rxjs/operators";
import { ReviewService } from "./review.service";
import { BehaviorSubject } from "rxjs";
import { ModalController } from "@ionic/angular";
import { ReviewFormModalComponent } from "./review-form-modal/review-form-modal.component";

@Component({
  selector: "app-review",
  templateUrl: "./review.component.html",
  styleUrls: ["./review.component.scss"]
})
export class ReviewComponent implements OnInit {
  product;
  data$: BehaviorSubject<any> = new BehaviorSubject({ loading: true });
  @ContentChild("content")
  content: ElementRef;
  constructor(
    private route: ActivatedRoute,
    private reviewService: ReviewService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.route.data.pipe(map(res => res.product)).subscribe(res => {
      console.log(res);
      this.product = res;
    });
  }
  loadMessages(roomId) {
    this.reviewService
      .getReviews(roomId)
      .pipe(
        catchError(err => {
          this.data$.next({ error: true });
          return err;
        })
      )
      .subscribe(res => {
        if (res && res.length > 0) this.data$.next({ data: res });
        else this.data$.next({ empty: true });
        console.log(res);
      });
  }
 async addReview(){
    const modal = await this.modalCtrl.create({
      component: ReviewFormModalComponent
    });
    return await modal.present();
  }
}
