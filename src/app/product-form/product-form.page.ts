import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import {
  ModalController,
  ToastController,
  LoadingController
} from "@ionic/angular";
import { Product } from "../shared/models/product";
import { ProductsService } from "../shared/services/products.service";
import { UploadService } from "../shared/services/upload.service";
import { finalize } from "rxjs/operators";
import {
  AngularFireStorage,
  AngularFireUploadTask
} from "angularfire2/storage";
import { AuthService } from "../shared/services";
import { ActivatedRoute } from "@angular/router";
import { ImageDirective } from "../shared/image.directive";

@Component({
  selector: "app-product-form",
  templateUrl: "./product-form.page.html",
  styleUrls: ["./product-form.page.scss"]
})
export class ProductFormPage implements OnInit {
  registerForm: FormGroup;
  loading;
  @ViewChild(ImageDirective)
  appImage: ImageDirective;
  isUpdate: boolean = false;
  product: Product = null;
  constructor(
    public modalController: ModalController,
    private fb: FormBuilder,
    public toastController: ToastController,
    private productsService: ProductsService,
    public loadingController: LoadingController,
    public uploadImage: UploadService,
    private storage: AngularFireStorage,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // debugger;
    if (this.route.snapshot.params["id"]) {
      this.isUpdate = true;
      this.route.data.subscribe((res: any) => {
        this.product = res.data;
        this.createForm(res.data);
      });
    } else {
      this.createForm();
    }
  }

  async onImageSelect(e: AngularFireUploadTask) {
    const loading = await this.loadingController.create({
      content: "Uploading..."
    });
    await loading.present();
    e.then(
      res => {
        loading.dismiss();
        this.presentToast("Image uploaded successfully .");
        if (res) {
          this.registerForm.get("imagePath").setValue(res.ref.fullPath);
          console.log(res);
          e.snapshotChanges()
            .pipe(
              finalize(() => {
                this.storage
                  .ref(res.ref.fullPath)
                  .getDownloadURL()
                  .subscribe(res => {
                    this.registerForm.get("imageUrl").setValue(res);
                  });
              })
            )
            .subscribe();
        }
      },
      err => {
        console.log(err);
        this.presentToast("Sorry something went wrong .");
        loading.dismiss();
      }
    ).catch(err => {
      console.log(err);
      this.presentToast("Sorry something went wrong .");
      loading.dismiss();
    });
  }
  onImageError(e) {
    console.log(e);
    this.presentToast("Sorry something went wrong .");
  }

  onClose() {
    this.modalController.dismiss();
  }

  onLocationSelect(location) {
    if (location) {
      this.registerForm.get("latLng").setValue(JSON.stringify(location));
    }
  }

  createForm(data: Product = null) {
    this.registerForm = this.fb.group({
      name: [data ? data.Name : null, Validators.required],
      phoneNumber: [data ? data.PhoneNumber : null, Validators.required],
      quantity: [data ? data.Quantity : null, Validators.required],
      price: [data ? data.Price : null, Validators.required],
      address: [data ? data.Address : null, Validators.required],
      latLng: [data ? data.LatLng : null, Validators.required],
      imagePath: [data ? data.ImagePath : null, Validators.required],
      imageUrl: [data ? data.ImageUrl : null, Validators.required],
      description: [data ? data.Description : null, Validators.required]
    });
  }

  prepareSaveInfo() {
    const formModel = this.registerForm.value;

    let data: Product = {
      Name: (formModel.name as string).toLowerCase(),
      PhoneNumber: formModel.phoneNumber as string,
      Quantity: formModel.quantity as string,
      Price: formModel.price as number,
      Address: formModel.address as string,
      LatLng: formModel.latLng as string,
      ImagePath: formModel.imagePath as string,
      ImageUrl: formModel.imageUrl as string,
      Description: formModel.description as string
    };

    return data;
  }

  onSave() {
    const user = this.authService.userSubject.value;
    if (this.registerForm.valid && user) {
      // this.presentLoading(true);
      let data: any = {
        ...this.prepareSaveInfo(),
        User: {
          Id: user.Id,
          FullName: user.FullName
        },
        Status: "pending"
      };

      this.presentLoading(true);
      let service = null;
      if (this.product && this.isUpdate) {
        service = this.productsService.update(this.product.Id, data);
      } else {
        service = this.productsService.register(data);
      }
      service
        .then(res => {
          if (this.isUpdate) this.registerForm.reset();
          this.presentLoading(false);
          this.presentToast("Product Saved Successfully .");
        })
        .catch(err => {
          this.presentLoading(false);
          this.presentToast("Something went wrong .");
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
  onReset() {
    this.registerForm.reset();
  }
}
