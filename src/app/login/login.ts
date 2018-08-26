import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../shared/services/auth.service";
import { User } from "../shared/models/user";

@Component({
  selector: "login",
  templateUrl: "login.html",
  styleUrls: ["login.scss"]
})
export class LoginPage {
  user: User={};
  constructor(private router: Router, private authService: AuthService) {}

  onLogin() {
    this.authService.login(this.user).subscribe((res: User) => {
      if(res.Id>0)
       this.router.navigate(["/user"]);
    });
  }

  onCancel() {
    this.router.navigate(["/home"]);
  }
}
