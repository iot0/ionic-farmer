// import {
//     Directive,
//     NgZone,
//     HostListener,
//     Output,
//     EventEmitter
//   } from "@angular/core";
//   import {
//     CameraOptions,
//     Plugins,
//     CameraResultType,
//     CameraSource
//   } from "@capacitor/core";
//   import {  DomSanitizer } from "@angular/platform-browser";
//   import {
//     ActionSheetController
//   } from "@ionic/angular";
//   const { Camera } = Plugins;
//   @Directive({
//     selector: "[appImage]"
//   })
//   export class ImageDirective {
//     @Output("onSuccess")
//     imageEmitter: EventEmitter<any> = new EventEmitter();
  
//     constructor(
//       private sanitizer: DomSanitizer,
//       public actionSheetController: ActionSheetController
//     ) {}
  
//     @HostListener("click")
//     async presentActionSheet() {
//       const actionSheet = await this.actionSheetController.create({
//         header: "Upload From",
//         buttons: [
//           {
//             text: "Camera",
//             icon: "camera",
//             handler: () => {
//               this.takePicture()
//               .then((data) =>
//               {
//                  this.imageEmitter.emit(data);
//               })
//               .catch((error) =>
//               {
//                  console.dir(error);
//                 //  this.displayErrorWarning(error);
//               });
//             }
//           },
//           {
//             text: "Photolibrary",
//             icon: "image",
//             handler: () => {
//               this.selectPhoto()
//               .then((data) =>
//               {
//                  this.imageEmitter.emit(data);
//               })
//               .catch((error) =>
//               {
//                  console.dir(error);
//                 //  this.displayErrorWarning(error);
//               });
//             }
//           },
//           {
//             text: "Cancel",
//             icon: "close",
//             role: "cancel",
//             handler: () => {
//               console.log("Cancel clicked");
//             }
//           }
//         ]
//       });
//       await actionSheet.present();
//     }
  
//     async takePicture()
//     {
  
//        /* Define the options for the getPhoto method - particularly the source for where
//           the image will be taken from (I.e. the device camera) and how we want the captured
//           image data returned (I.e. base64 string or a file uri) */
//        const image  	= await Camera.getPhoto({
//           quality 		: 	90,
//           allowEditing 	: 	false,
//           resultType 	: 	CameraResultType.Uri,
//           source 		: 	CameraSource.Camera
//        });
  
  
//        /* We need to run the returned Image URL through Angular's DomSanitizer to 'trust'
//           this for use within the application (I.e. so that Angular knows this isn't an
//           XSS attempt or similarly malicious code) */
//       //  this._IMAGE 		= this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.webPath));
//       //  return this._IMAGE;
//       return image;
//     }
//     async selectPhoto() 
//     {
  
//        /* Define the options for the getPhoto method - particularly how we want the
//           image data returned (I.e. base64 string or a file uri) */
//        const image 	= await Camera.getPhoto({
//           quality 		:	90,
//           allowEditing 	: 	false,
//           resultType 	: 	CameraResultType.Base64,
//           source 		: 	CameraSource.Photos
//        });
  
  
//        // We return the webPath property of the image object (which contains the image path)
//       //  return image.webPath;
//       return image;
//     }
  
  
  
//     displayErrorWarning(message : string) : void
//     {
//        let alert : any = this.actionSheetController.create({
//           header          : 'Error',
//           subHeader       : message,
//           buttons      : ['Ok']
  
//        })
//        alert.present();
//     }
    
    
//   }
  