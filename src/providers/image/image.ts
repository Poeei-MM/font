import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Transfer, TransferObject } from '@ionic-native/transfer';

/*
  Generated class for the ImageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ImageProvider {
  cameraImage: any;
  
  constructor(public http     : Http,
              private _CAMERA : Camera,
              private transfer: Transfer) {
    console.log('Hello ImageProvider Provider');
  }
  
  selectImage() {
      return new Promise(resolve => {
         let cameraOptions : CameraOptions = {
			quality			   : 100,
			destinationType	   : this._CAMERA.DestinationType.DATA_URL,
			sourceType		   : this._CAMERA.PictureSourceType.PHOTOLIBRARY,
			allowEdit		   : false,
			targetWidth        : 512,
			targetHeight       : 512,
			encodingType       : this._CAMERA.EncodingType.JPEG,
			mediaType          : this._CAMERA.MediaType.PICTURE,
			correctOrientation : true
         };

         this._CAMERA.getPicture(cameraOptions).then((data) => {
            this.cameraImage = "data:image/jpeg;base64," + data;
            
            resolve(this.cameraImage);
            
		  });
		});  
   }
}
