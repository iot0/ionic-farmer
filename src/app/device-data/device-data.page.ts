import { Component, OnInit } from "@angular/core";
import {
  ActionSheetController,
  ModalController,
  ToastController,
  LoadingController
} from "@ionic/angular";
import { ReportingFormComponent } from "../shared/components/reporting-form/reporting-form.component";
import { FillStatus } from "../shared/models/fill-status";
import { DeviceService } from "../shared/services";
import { OdorStatus } from "../shared/models/odor-status";
import { catchError, tap, finalize, map } from "rxjs/operators";
import { of } from "rxjs";

const HUMIDITY_THRESHOLD = 500;
class Sensor {
  constructor(public humidity: number, public ph: number) {}
}

@Component({
  selector: "app-device-data",
  templateUrl: "./device-data.page.html",
  styleUrls: ["./device-data.page.scss"]
})
export class DeviceDataPage implements OnInit {
  deviceData;
  loading;
  constructor(
    public modalController: ModalController,
    private deviceService: DeviceService,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) {}

  ngOnInit() {}
  // get checkThresholdOverflow() {
  //   return this.humidity > 500;
  // }
  onSync(ip) {
    if (ip) {
      this.deviceService.sync(ip)
      .pipe(catchError((err)=>{
        this.presentToast("Something went worng");
        return err;
      }))
      .subscribe(res => {
        this.deviceData = res;
      });
    }
  }

  updateMode(ip) {
    const data={
      ...this.deviceData,
      intelligentMode:this.deviceData.intelligentMode == 0 ? 1 : 0
    };
    this.postStatus(ip, data).subscribe(res => {
      if(res){
        let message ="INTELLIGENT MODE : " + (data.intelligentMode == 1 ? "Enabled" : "Disabled");
        this.presentToast(message);
      }else this.presentToast("Something Went Wrong !.");
    });
  }
  updateLampStatus(ip) {
    const data={
      ...this.deviceData,
      lamp:this.deviceData.lamp == 0 ? 1 : 0
    };
    this.postStatus(ip, data).subscribe(res => {
      if(res){
        let message ="LAMP IS SWITCHED " + (data.lamp == 1 ? "ON" : " OFF ");
        this.presentToast(message);
      }else this.presentToast("Something Went Wrong !.");
    });
  }
  updatePumpStatus(ip) {
    const data={
      ...this.deviceData,
      pump:this.deviceData.pump == 0 ? 1 : 0
    };
    const status = this.deviceData.intelligentMode == 0 ? 1 : 0;
    this.postStatus(ip, data).subscribe(res => {
      if(res){
        let message ="PUMP IS SWITCHED " + (data.pump == 1 ? "ON" : " OFF ");
        this.presentToast(message);
      }else this.presentToast("Something Went Wrong !.");
    });
  }
  postStatus(ip, data) {
    if (ip) {
      const request = {
        ...this.deviceData,
        ...data
      };
      return this.deviceService.updateDeviceStatus(ip, request).pipe(
        catchError(err => {
          this.presentToast("Something Went Wrong !.");
          return err;
        }),
        map(()=>{
          return true;}),
      );
    }
    return of(false);
  }

  async onReport() {
    const modal = await this.modalController.create({
      component: ReportingFormComponent
    });
    return await modal.present();
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
