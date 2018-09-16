import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { of as ObservableOf,BehaviorSubject, Observable, of } from 'rxjs';
import { map, distinctUntilChanged, take, tap } from 'rxjs/operators';
import { UserRole } from '../models/user-role';
import { Router } from '@angular/router';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userCollectionName: string = "farmerUsers";

  userSubject: BehaviorSubject<User> = new BehaviorSubject(null);

  currentUser$: Observable<User> = this.userSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  isLoggedIn$: Observable<boolean> = this.userSubject
    .asObservable()
    .pipe(map(x => !!x));

  isAdmin$: Observable<boolean> = this.currentUser$.pipe(
    map(x => {
      return x?x.Role===UserRole.Admin:false;
    })
  );

  isFarmer$: Observable<boolean> = this.userSubject.asObservable().pipe(
    map(x => x?x.Role === UserRole.Farmer:false),
  );

  isCustomer$: Observable<boolean> = this.userSubject.asObservable().pipe(
    map(x => x.Role === UserRole.Customer)
  );

  constructor(
    private router: Router,
    private firestoreService: FirestoreService
  ) {
    const user = window.localStorage["user"];
    if (user) {
      this.userSubject.next(JSON.parse(user));
    }
  }

  register(user: User) {
    return this.firestoreService.add(this.userCollectionName, user);
  }
  login(user: User): Observable<User> {
    return this.firestoreService
      .colWithIds$<User>(this.userCollectionName, ref => {
        return ref
          .where("PhoneNumber", "==", user.PhoneNumber)
          .where("Password", "==", user.Password)
          .limit(1);
      })
      .pipe(
        take(1),
        map(res => {
          return res.length > 0 ? res[0] : null;
        }),
        tap(x => {
          if (x !== null) {
            window.localStorage["user"] = JSON.stringify(x);
            this.userSubject.next(x);
          }
        })
      );
  }
  getByRole(role: UserRole): Observable<any> {
    return this.firestoreService.colWithIds$<User>(
      this.userCollectionName,
      ref => {
        return ref.where("Role", "==", role).limit(20);
      }
    );
  }
  logOut() {
    window.localStorage.removeItem("user");
    this.userSubject.next(null);
    return of(true);
  }
}
