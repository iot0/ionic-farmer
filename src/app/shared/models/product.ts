import { User } from "./user";

export class Product{
    Id?:string;
    Name?:string;
    PhoneNumber?:string;
    Quantity?:string;
    Price?:number;
    Address?:string;
    LatLng?:string;
    ImagePath?:string;
    ImageUrl?:string;
    Description?:string;
    User?:User;
    CreatedAt?:any;
    AvgRatings?:number;
    ReviewCount?:number;
    TotalRatings?:number;
}