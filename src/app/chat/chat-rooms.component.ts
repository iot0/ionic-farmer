import { Component, OnInit, ElementRef, ContentChild } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ChatService } from "./chat.service";
import { catchError } from "rxjs/operators";
import { AuthService } from "../shared/services";
import { Router } from "@angular/router";

@Component({
  selector: "app-chat-rooms",
  templateUrl: "./chat-rooms.component.html",
  styleUrls: ["./chat-rooms.component.scss"]
})
export class ChatRoomsComponent implements OnInit {
  data$: BehaviorSubject<any> = new BehaviorSubject({ loading: true });
  @ContentChild("content")
  content: ElementRef;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.loadMessages(user.Id);
    });
  }
  openChat(pairId: string) {
    this.router.navigate(["/chats", pairId]);
  }
  loadMessages(userId) {
    this.chatService
      .getUserRoomList(userId)
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
}
