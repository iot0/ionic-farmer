import { Component, OnInit } from "@angular/core";
import { catchError } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "../shared/services";
import { UserRole } from "../shared/models/user-role";

@Component({
  selector: "app-view-users",
  templateUrl: "./view-users.page.html",
  styleUrls: ["./view-users.page.scss"]
})
export class ViewUsersPage implements OnInit {
  data$: BehaviorSubject<any> = new BehaviorSubject({ loading: true });
  role;
  UserRoles=UserRole;
  constructor(
    private route: ActivatedRoute,
    private userService: AuthService
  ) {}
  get isFarmer() {
    return this.role === UserRole.Farmer;
  }
  get isCustomer() {
    return this.role === UserRole.Customer;
  }
  ngOnInit() {
    this.route.params.subscribe(param => {
      if (param.role) {
        this.role = +param.role;
        this.userService
          .getByRole(this.role)
          .pipe(
            catchError(err => {
              this.data$.next({ error: true });
              return err;
            })
          )
          .subscribe(res => {
            console.log(res);
            if (res && res.length > 0) this.data$.next({ data: res });
            else this.data$.next({ empty: true });
          });
      }
    });
  }
}
