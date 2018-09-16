import { Component, OnInit } from "@angular/core";
import { AuthService } from "../shared/services";
import { Router } from "@angular/router";
import { LoadingController, ToastController } from "@ionic/angular";
import { ChatService, ChatRoom } from "../chat/chat.service";
import { take, finalize } from "rxjs/operators";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"]
})
export class SettingsPage implements OnInit {
  loading;
  constructor(
    private userService: AuthService,
    private router: Router,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private chatService: ChatService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  logOut() {
    this.userService.logOut().subscribe(() => {
      this.router.navigate(["/login"]);
    });
  }

  askAdmin() {
    this.presentLoading(true);
    const currentUser = this.authService.userSubject.value;
    const roomInfo: ChatRoom = {
      User: currentUser,
      PairId: this.chatService.createAdminPairId(currentUser),
      WithAdmin:true
    };
    this.chatService
      .getUserRoom(roomInfo)
      .pipe(
        take(1),
        finalize(() => {
          this.presentLoading(false);
        })
      )
      .subscribe(res => {
        console.log(res);
        this.router.navigate(["/chats", roomInfo.PairId]);
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
