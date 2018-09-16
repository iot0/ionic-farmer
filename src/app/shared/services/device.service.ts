import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timer } from 'rxjs';
import { switchMap, catchError, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http:HttpClient) { }
  
  sync(ip:string){
    return timer(0,2000)
    .pipe(
      switchMap(x => {
        return this.http.get(`http://${ip}/status`);
      }),
      share()
    )
  }

  updateDeviceStatus(ip,status){
    return this.http.post(`http://${ip}/device_status_update`,status);
  }
  updateIntelligentMode(ip,isActive){
    return this.http.post(`http://${ip}/update_intelligentmode`,{intelligentmode:isActive});
  }
}
