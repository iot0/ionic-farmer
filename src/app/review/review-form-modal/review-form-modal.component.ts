import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-review-form-modal",
  templateUrl: "./review-form-modal.component.html",
  styleUrls: ["./review-form-modal.component.scss"]
})
export class ReviewFormModalComponent implements OnInit {
  constructor(public modalController: ModalController) {}

  ngOnInit() {}
  onRating(e) {
    console.log(e);
  }

  onClose() {
    this.modalController.dismiss();
  }
}
