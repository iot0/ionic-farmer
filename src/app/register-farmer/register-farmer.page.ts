import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { User } from 'firebase';
import { UserRole } from '../shared/models/user-role';
import { AuthService } from '../shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-farmer',
  templateUrl: './register-farmer.page.html',
  styleUrls: ['./register-farmer.page.scss'],
})
export class RegisterFarmerPage implements OnInit {

  registerForm: FormGroup;
  loading;
  constructor(
    private fb: FormBuilder,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private userService: AuthService,
    private router: Router,
  ) {
    this.createForm();
  }

  ngOnInit() {}

  createForm() {
    this.registerForm = this.fb.group({
      fullName: ["", Validators.required],
      emailId: ["", Validators.required],
      phoneNumber: ["", Validators.required],
      adhaarId: ["", Validators.required],
      address: ["", Validators.required],
      password: ["", Validators.required],
      landArea: ["", Validators.required],
    });
  }

  prepareSaveInfo() {
    const formModel = this.registerForm.value;

    let data = {
      FullName: formModel.fullName as string,
      EmailId: formModel.emailId as string,
      PhoneNumber: formModel.phoneNumber as string,
      AdhaarId: formModel.adhaarId as string,
      Address: formModel.address as string,
      LandArea: formModel.landArea as string,
      Password: formModel.password as string,
    };

    return data;
  }

  onSave() {
    if (this.registerForm.valid) {
      // this.presentLoading(true);
      let data:any = this.prepareSaveInfo();
      data.Role=UserRole.Farmer;
      this.presentLoading(true);
      this.userService.register(data)
      .then((res)=>{
        this.presentLoading(false);
        this.router.navigate(["/admin"]);
        this.presentToast("Registration successfull ."); 
        this.registerForm.reset();
      })
      .catch((err)=>{
        this.presentLoading(false);
        this.presentToast("Sorry something went wrong .");  
      })
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
}
