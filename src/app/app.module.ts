import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AppErrorHandler } from "./app-error.handler";
import { HttpClientModule } from "@angular/common/http";

import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import {AngularFirestoreModule } from 'angularfire2/firestore' ;
import { environment } from "../environments/environment";
import { KhMapsModule } from "../libs/kh-maps/src/public_api";
import { Camera } from "@ionic-native/camera/ngx";
import { SharedModule } from "./shared";
import { ChatModule } from "./chat/chat.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase,"ionic-farmer"),
    AngularFirestoreModule,
    AngularFireStorageModule,
    KhMapsModule.forRoot(environment.googleMapApiKey)
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: ErrorHandler, useClass: AppErrorHandler },
    Camera
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
