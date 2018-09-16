import {
  Component,
  OnInit,
  Input,
  ContentChild,
  ElementRef
} from "@angular/core";
import { ProductsService } from "../../services/products.service";
import { LoadingController, ToastController } from "@ionic/angular";
import { BehaviorSubject } from "rxjs";
import { catchError, take, switchMap, finalize } from "rxjs/operators";
import { Product } from "../../models/product";
import { AuthService } from "../../services";
import { Router } from "@angular/router";
import { User } from "../../models/user";
import { ChatService, ChatRoom } from "../../../chat/chat.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductsComponent implements OnInit {
  currentStatus;
  loading;
  @Input("loadAll")
  loadAll: boolean = true;
  data$: BehaviorSubject<any> = new BehaviorSubject({ loading: true });
  @ContentChild("content")
  content: ElementRef;
  user$;
  constructor(
    private productsService: ProductsService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public authService: AuthService,
    private router: Router,
    private chatService: ChatService
  ) {}

  ngOnInit() {
    if (this.loadAll) {
      this.productsService
        .get()
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
  getByUser(userId) {
    this.productsService
      .getByUser(userId)
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
  onSearch(value) {
    this.productsService
      .search(value)
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
  onFilter(value) {
    this.currentStatus = value;
    this.presentLoading(true);
    this.productsService
      .filterByStatus(value)
      .pipe(
        catchError(err => {
          this.data$.next({ error: true });
          this.presentLoading(false);
          return err;
        }),
        take(1)
      )
      .subscribe(res => {
        this.presentLoading(false);
        if (res && res.length > 0) this.data$.next({ data: res });
        else this.data$.next({ empty: true });
        console.log(res);
      });
  }

  onApprove(product: Product) {
    this.presentLoading(true);
    this.productsService.updateStatus(product.Id, "approved").then(
      res => {
        this.presentLoading(false);
        this.presentToast("Status Updated Successfully .");
        this.onFilter(this.currentStatus);
      },
      err => {
        this.presentLoading(false);
        this.presentToast("Sorry something went wrong .");
      }
    );
  }
  onReject(product) {
    this.presentLoading(true);
    this.productsService.updateStatus(product.Id, "rejected").then(
      res => {
        this.presentLoading(false);
        this.presentToast("Status Updated Successfully .");
        this.onFilter(this.currentStatus);
      },
      err => {
        this.presentLoading(false);
        this.presentToast("Sorry something went wrong .");
      }
    );
  }
  onDelete(product) {
    this.presentLoading(true);
    this.productsService.delete(product.Id).then(
      res => {
        this.presentLoading(false);
        this.presentToast("Deleted Successfully .");
      },
      err => {
        this.presentLoading(false);
        this.presentToast("Sorry something went wrong .");
      }
    );
  }
  openChats(product: Product) {
    this.presentLoading(true);
    const currentUser = this.authService.userSubject.value;
    const roomInfo: ChatRoom = {
      Product: product,
      PairId: this.chatService.createProductPairId(product, currentUser)
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
