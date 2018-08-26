import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { of as ObservableOf,BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authSubject:BehaviorSubject<User>=new BehaviorSubject(null);
  isLoggedIn$=this.authSubject.asObservable().pipe(map(x=>x && x.Id>0));
  isAdmin$=this.authSubject.asObservable().pipe(map(x=>x && x.Role==="admin"));

  constructor() { }

  login(user:User){
    user.Id=1;
    if(user.UserName==="admin") user.Role="admin";
    this.authSubject.next(user);
    return ObservableOf(user);
  }
}
