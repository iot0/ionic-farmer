import { Component, OnInit } from "@angular/core";
import { ActionSheetController, ModalController } from "@ionic/angular";
import { ReportingFormComponent } from "../shared/components/reporting-form/reporting-form.component";
import { FillStatus } from "../shared/models/fill-status";
import { DeviceService } from "../shared/services";
import { OdorStatus } from "../shared/models/odor-status";

class Sensor {
  constructor(public ultraSonic:number,public mq2:number){}
  get fillStatus(){
      return this.ultraSonic<=50?FillStatus.Half:FillStatus.Full;
  }
  get odorStatus(){
    return OdorStatus.Heavy;
  }
}

@Component({
  selector: "app-device-data",
  templateUrl: "./device-data.page.html",
  styleUrls: ["./device-data.page.scss"]
})
export class DeviceDataPage implements OnInit {
  fillStatuses = FillStatus;
  ip: string;
  currentStatus = FillStatus.Nothing;
  timeout;
  sensor:Sensor;
  constructor(public modalController: ModalController, private deviceService: DeviceService) { }

  ngOnInit() {

  }

  onSync() {
    if (this.timeout) clearTimeout(this.timeout);
    if (this.ip && this.ip.trim() != "") {

      this.deviceService.sync(this.ip).subscribe((res: Sensor) => {
        console.log(res);
        if (res) {
          this.sensor=new Sensor(res.ultraSonic,res.mq2);
        }
      })
      let self = this;
      this.timeout = setTimeout(() => {
        self.onSync();
      }, 2000)
    }
  }
  onChangeStatus() {
    let value = this.currentStatus + 1;

    if (value > 3) value = 1;

    this.currentStatus = value;// this.pollutionStatuses[value];
  }

  async onReport() {
    const modal = await this.modalController.create({
      component: ReportingFormComponent
    });
    return await modal.present();
  }
}
