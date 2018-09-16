import { Component, OnInit, ElementRef, ContentChild } from "@angular/core";
import { AuthService } from "../shared/services";
import { ActivatedRoute } from "@angular/router";
import { map, switchMap, tap, catchError, take } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { ToastController, LoadingController } from "@ionic/angular";
import { ChatService, ChatRoom, ChatRoomMessage } from "./chat.service";
import { AdminService } from "./admin.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"]
})
export class ChatComponent implements OnInit {
  room: ChatRoom;
  loading;
  data$: BehaviorSubject<any> = new BehaviorSubject({ loading: true });
  @ContentChild("content")
  content: ElementRef;
  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private route: ActivatedRoute,
    private chatService: ChatService,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) {
    this.route.data.pipe(map(res => res.room)).subscribe(room => {
      this.room = room;
      this.loadMessages(room.Id);
    });
  }
  ngOnInit() {}

  loadMessages(roomId) {
    if (this.room.WithAdmin) {
      this.adminService
        .getAllMessages(roomId)
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
    } else {
      this.chatService
        .getUserMessages(roomId)
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

  messageFromTitle(message: ChatRoomMessage) {
    if (
      message.From &&
      message.From.Id === this.authService.userSubject.value.Id
    ) {
      return "You";
    } else if (message.From) {
      return message.From.FullName;
    } else {
      return null;
    }
  }

  isMine(chat) {
    return chat.From
      ? chat.From.Id === this.authService.userSubject.value.Id
      : false;
  }

  sendUserMessage(message) {
    const chat: ChatRoomMessage = {
      Message: message,
      To: this.room.Product.User,
      From: this.authService.userSubject.value
    };
    this.chatService.send(this.room.Id, chat);
  }

  sendAdminMessage(message) {
    this.authService.isAdmin$.subscribe(res => {
      const chat: ChatRoomMessage = {
        Message: message
      };
      if (res) {
        chat.FromAdmin = true;
        chat.User = this.room.User;
      } else {
        chat.ToAdmin = true;
        chat.User = this.authService.userSubject.value;
      }
      this.adminService.send(this.room.Id, chat);
    });
  }

  async presentLoading(show) {
    if (show) {
      this.loading = await this.loadingController.create({
        content: "Processing..."
      });
      return await this.loading.present();
    } else if (this.loading) {
      return await this.loading.dismiss();
    }
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
}
