import { Injectable } from "@angular/core";
import { FirestoreService } from "../shared/services";
import { User } from "../shared/models/user";
import { Observable } from "rxjs";
import { Product } from "../shared/models/product";
import { take } from "rxjs/operators";

export interface UserReview {
  Id?: string;
  User?: User;
  Ratings?: number;
  Review?: boolean;
}

@Injectable({
  providedIn: "root"
})
export class ReviewService {
  subCollectionName: string = "Reviews";
  collectionName: string = "farmerProducts";

  constructor(private firestoreService: FirestoreService) {}

  sendReview(product: Product, review: UserReview) {
    const updatedProduct: Product = {
      ReviewCount: product.ReviewCount + 1,
      TotalRatings: product.TotalRatings + review.Ratings
    };

    return this.firestoreService
      .add(
        `${this.collectionName}/${product.Id}/${this.subCollectionName}`,
        review
      )
      .then(() => {
        this.firestoreService.update(
          `${this.collectionName}/${product.Id}`,
          updatedProduct
        );
      });
  }
  getReviews(roomId: string): Observable<any> {
    return this.firestoreService.colWithIds$(
      `${this.collectionName}/${roomId}/${this.subCollectionName}`,
      ref => {
        return ref.limit(30).orderBy("CreatedAt", "desc");
      }
    );
  }
  updateProduct(docId: string, product: Product) {
    this.firestoreService
      .docWithId$(`${this.collectionName}/${docId}`)
      .pipe(take(1))
      .subscribe((res: Product) => {
        const updatedProduct: Product = {
          ReviewCount: res.ReviewCount + 1,
          TotalRatings: res.TotalRatings + product.TotalRatings
        };
        this.firestoreService.update(
          `${this.collectionName}/${docId}`,
          updatedProduct
        );
      });
  }
}
