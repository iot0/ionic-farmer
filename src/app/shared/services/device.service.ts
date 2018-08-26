import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor(private http:HttpClient) { }
  
  sync(ip:string){
    return this.http.get(`http://${ip}/status`);
  }
}
