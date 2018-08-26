import { Device } from "./device";
import { Type } from "@angular/core";
export interface User{
    Id?:number,
    UserName?:string,
    Role?:string,//admin/customer
    AdhaarId?:number,
    Address?:string,
    Password?:string,
    Devices?:Device[]
}