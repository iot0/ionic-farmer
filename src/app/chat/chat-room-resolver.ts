import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";
import { map, take, tap } from "rxjs/operators";
import { ChatRoom, ChatService } from "./chat.service";

@Injectable({
  providedIn: "root"
})
export class ChatRoomResolver implements Resolve<ChatRoom> {
  constructor(private chatService: ChatService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    let id = route.paramMap.get("id");
    return this.chatService.getUserRoom({ PairId: id }).pipe(
      take(1),
      map(data => {
        if (data) {
          return data;
        } else {
          // id not found
          return null;
        }
      })
    );
  }
}
