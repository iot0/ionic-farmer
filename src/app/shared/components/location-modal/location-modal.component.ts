import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
@Component({
  selector: "app-location-modal",
  templateUrl: "./location-modal.component.html",
  styleUrls: ["./location-modal.component.scss"]
})
export class LocationModalComponent implements OnInit {
  loading:boolean=true;
  constructor(public modalController: ModalController) {
    this.loading=true;
  }

  ngOnInit() {
    
  }

  onClose() {
    this.modalController.dismiss();
  }

  onMapError(res){
    this.loading=false;
  }
  onMapSuccess(res){
    this.loading=false;
  }
}
