import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../shared/services/auth.service";
import { User } from "../shared/models/user";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoadingController, ToastController } from "@ionic/angular";
import { catchError } from "rxjs/operators";
import { UserRole } from "../shared/models/user-role";

@Component({
  selector: "login",
  templateUrl: "login.html",
  styleUrls: ["login.scss"]
})
export class LoginPage {
  loginForm: FormGroup;
  loading;
  constructor(
    private router: Router,
    private authService:AuthService,
    private fb: FormBuilder,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      phoneNumber: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.presentLoading(true);
      const formModel = this.loginForm.value;
      let data: User = {
        PhoneNumber: formModel.phoneNumber as string,
        Password: formModel.password as string
      };
      this.authService
        .login(data)
        .pipe(
          catchError(err => {
            this.presentLoading(false);
            this.presentToast("Something Went Wrong !.");
            return err;
          })
        )
        .subscribe((res: User) => {
          if (res !== null) {
            if (+res.Role !== UserRole.Admin) {
              this.router.navigate(["/user"]);
            } else {
              this.router.navigate(["/admin"]);
            }
          } else {
            this.presentToast("Username or Password is incorrect .");
          }
          this.presentLoading(false);
        });
    } else {
      this.presentToast("Please fill all the required fields .");
    }
  }

  async presentLoading(show) {
    if (show) {
      this.loading = await this.loadingController.create({
        content: "Processing..."
      });
      return await this.loading.present();
    } else if (this.loading) {
      return await this.loading.dismiss();
    }
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  onCancel() {
    this.router.navigate(["/home"]);
  }
}
