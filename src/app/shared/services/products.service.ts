import { Injectable } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { FirestoreService } from "./firestore.service";
import { Product } from "../models/product";
@Injectable({
  providedIn: "root"
})
export class ProductsService {
  collectionName: string = "farmerProducts";
  constructor(private firestoreService: FirestoreService) {}

  register(product: any) {
    return this.firestoreService.add(this.collectionName, product);
  }

  update(docId, product: Product) {
    return this.firestoreService.update(
      `${this.collectionName}/${docId}`,
      product
    );
  }

  get(): any {
    return this.firestoreService.colWithIds$(this.collectionName, q => {
      return q.limit(30).orderBy("createdAt", "desc");
    });
  }
  getByUser(userId:string): any {
    return this.firestoreService.colWithIds$(this.collectionName, q => {
      return q.where("User.Id","==",userId)
      .limit(30);
    });
  }
  getById(productId: string): any {
    return this.firestoreService.docWithId$(
      `${this.collectionName}/${productId}`
    );
  }

  search(value): any {
    return this.firestoreService.colWithIds$(this.collectionName, q => {
      return q
        .orderBy("Name")
        .startAt(value.toLowerCase())
        .endAt(value.toLowerCase() + "\uf8ff")
        .limit(10);
    });
  }
  filterByStatus(value): any {
    return this.firestoreService.colWithIds$(this.collectionName, q => {
      return q.where("Status", "==", value).limit(30);
    });
  }
  updateStatus(docId, status) {
    return this.firestoreService.update(`${this.collectionName}/${docId}`, {
      Status: status
    });
  }
  delete(docId) {
    return this.firestoreService.delete(`${this.collectionName}/${docId}`);
  }
}
