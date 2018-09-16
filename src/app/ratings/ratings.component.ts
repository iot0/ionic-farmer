import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";

@Component({
  selector: "app-ratings",
  templateUrl: "./ratings.component.html",
  styleUrls: ["./ratings.component.scss"]
})
export class RatingsComponent implements OnInit {
  @Input()
  rating: number;
  @Input()
  update: boolean=false;
  @Input()
  itemId: number;
  @Output()
  ratingClick: EventEmitter<any> = new EventEmitter<any>();

  inputName: string;
  ngOnInit() {
    this.inputName = this.itemId + "_rating";
  }
  onClick(rating: number): void {
    this.rating = rating;
    this.ratingClick.emit({
      itemId: this.itemId,
      rating: rating
    });
  }
}
