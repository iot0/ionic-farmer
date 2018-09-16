import { Component, OnInit } from "@angular/core";
import { UserRole } from "../shared/models/user-role";
import { AuthService } from "../shared/services";
import { Router } from "@angular/router";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.page.html",
  styleUrls: ["./admin.page.scss"]
})
export class AdminPage implements OnInit {
  constructor(public userService: AuthService, private router: Router) {}

  ngOnInit() {}
  getFarmerRole() {
    return UserRole.Farmer;
  }
  getCustomerRole() {
    return UserRole.Customer;
  }

  logOut() {
    this.userService.logOut().subscribe(() => {
      this.router.navigate(["/home"]);
    });
  }
}
