import { Injectable } from "@angular/core";
import { FirestoreService } from "../shared/services";
import { User } from "../shared/models/user";
import { Product } from "../shared/models/product";
import { Observable, of } from "rxjs";
import { switchMap, map, take } from "rxjs/operators";
import { ChatRoom, ChatRoomMessage } from "./chat.service";

@Injectable({
  providedIn: "root"
})
export class AdminService {
  collectionName: string = "adminFarmerChats";

  constructor(private firestoreService: FirestoreService) {}

  getAllMessages(roomInfo: ChatRoom) {
    return this.firestoreService
      .colWithIds$(this.collectionName, ref => {
        return ref.where("PairId", "==", "admin")
        .where("User.Id", "==", roomInfo.User.Id);
      })
      .pipe(
        switchMap(cols => {
          if (cols && cols.length > 0) return of(cols[0]);
          else return this.addNewRoom(roomInfo);
        })
      );
  }
  private addNewRoom(room: ChatRoom) {
    return this.firestoreService.add(this.collectionName, room);
  }

  public send(roomId: string, message: ChatRoomMessage) {
    return this.firestoreService.add(
      `${this.collectionName}/${roomId}/Messages`,
      message
    );
  }
}
