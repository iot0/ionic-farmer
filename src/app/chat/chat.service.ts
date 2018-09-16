import { Injectable } from "@angular/core";
import { FirestoreService } from "../shared/services";
import { User } from "../shared/models/user";
import { Product } from "../shared/models/product";
import { Observable, of } from "rxjs";
import { switchMap, map, take } from "rxjs/operators";

export interface ChatRoom {
  Id?: string;
  Product?: Product;
  User?: User;
  PairId?: string;
  WithAdmin?: boolean;
  Messages?: ChatRoomMessage[];
}
export interface ChatRoomMessage {
  Id?: string;
  Message?: string;
  From?: User;
  To?: User;
  User?: User;
  ToAdmin?:boolean;
  FromAdmin?:boolean;
}

@Injectable({
  providedIn: "root"
})
export class ChatService {
  chatCollectionName: string = "farmerChats";
  messageCollectionName: string = "Messages";

  constructor(private firestoreService: FirestoreService) {}

  getUserRoom(roomInfo: ChatRoom) {
    return this.firestoreService
      .colWithIds$(this.chatCollectionName, ref => {
        return ref.where("PairId", "==", roomInfo.PairId);
      })
      .pipe(
        switchMap(cols => {
          if (cols && cols.length > 0) return of(cols[0]);
          else return this.addNewRoom(roomInfo);
        })
      );
  }

  getUserRoomList(userId): Observable<any> {
    return this.firestoreService.colWithIds$(this.chatCollectionName, ref => {
      return ref
        .orderBy("PairId")
        // .startAt(userId)
        .endAt(userId + "\uf8ff")
        .limit(10);
    });
  }

  getUserMessages(roomId: string): Observable<any> {
    return this.firestoreService.colWithIds$(
      `${this.chatCollectionName}/${roomId}/${this.messageCollectionName}`,
      ref => {
        return ref.limit(30).orderBy("CreatedAt", "desc");
      }
    );
  }

  private addNewRoom(room: ChatRoom) {
    return this.firestoreService.add(this.chatCollectionName, room);
  }

  public send(roomId: string, message: ChatRoomMessage) {
    return this.firestoreService.add(
      `${this.chatCollectionName}/${roomId}/Messages`,
      message
    );
  }

  createPairId(user1: User, user2: User) {
    let pairId;
    if (user1.CreatedAt < user2.CreatedAt) {
      pairId = `${user1.Id}|${user2.Id}`;
    } else {
      pairId = `${user2.Id}|${user1.Id}`;
    }
    return pairId;
  }
  createProductPairId(product: Product, user: User) {
    let pairId;
    pairId = `${user.Id}|${product.Id}|{${product.User.Id}}`;
    return pairId;
  }
  createAdminPairId(user: User) {
    let pairId;
    pairId = `admin_{${user.Id}}`;
    return pairId;
  }
  // createProductPairId(product: Product, user: User) {
  //   let pairId;
  //   if (user.CreatedAt < product.CreatedAt) {
  //     pairId = `${user.Id}|${product.Id}`;
  //   } else {
  //     pairId = `${product.Id}|${user.Id}`;
  //   }
  //   return pairId;
  // }
}
