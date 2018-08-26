import { User } from "./user";
import { OdorStatus } from "./odor-status";
import { FillStatus } from "./fill-status";

export interface Device{
    Id?:number,
    UserId?:number,
    User?:User,
    LatLng?:string,
    OdorStatus?:OdorStatus,
    FillStatus?:FillStatus
}