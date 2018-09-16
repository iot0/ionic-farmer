import { Device } from "./device";
import { Type } from "@angular/core";
import { UserRole } from "./user-role";
export interface User{
    Id?:number,
    FullName?:string,
    EmailId?:string,
    PhoneNumber?:string,
    Role?:UserRole,//admin/customer
    AdhaarId?:number,
    Address?:string,
    Password?:string,
    Devices?:Device[],
    CreatedAt?:any;
    UpdatedAt?:any;
}