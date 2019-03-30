import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ImageProvider } from '../../providers/image/image';
//import { Transfer, TransferObject, FileUploadOptions  } from '@ionic-native/transfer';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
//import { File } from '@ionic-native/file';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  
  image: any;
  pimageFile: any;
  
  constructor(public navCtrl: NavController, 
			  public navParams: NavParams,
			  public _IMG: ImageProvider,
			  public loadingCtrl: LoadingController,
			  public toastCtrl: ToastController,
			  private transfer: FileTransfer) {
			  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  
  uploadImage() {
	this._IMG.selectImage().then(data=>{
	   this.image = data;
	   alert(this.image);
	   //this.uploadFile();
	});
  }

  uploadFile() {
	let loader = this.loadingCtrl.create({
		content: "Uploading..."
	  });
	  loader.present();
	  
	//let token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbW9iaWxlYXBwLnR3b3Jrc3lzdGVtLm9yZyIsImlhdCI6MTU1MzU2OTQ3MiwibmJmIjoxNTUzNTY5NDcyLCJleHAiOjE1NTQxNzQyNzIsImRhdGEiOnsidXNlciI6eyJpZCI6IjIifX19.uWQX6r7-4jtp7UwvvbyX_evljiq165vvRu9ERRo8R5k';
	
	const trans : FileTransferObject = this.transfer.create();
    const options: FileUploadOptions = {
		 fileKey: 'file',
		 fileName: 'image.jpg',
		 headers: {
			"Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbW9iaWxlYXBwLnR3b3Jrc3lzdGVtLm9yZyIsImlhdCI6MTU1MzU3NjQ2NCwibmJmIjoxNTUzNTc2NDY0LCJleHAiOjE1NTQxODEyNjQsImRhdGEiOnsidXNlciI6eyJpZCI6IjIyIn19fQ.Bc5T2AXsyxgnKNXH34zPhdUO_C9s1XquTRzgJ4BuSMM",
			"content-disposition": "attachment; filename=\'tworksystem1.jpeg\'"
		 }

	};
	
	trans.upload(this.image , "https://mobileapp.tworksystem.org/wp-json/wp/v2/media", options ).then((res)=> {
		let response = res.response;
		this.pimageFile = JSON.parse(response);
		alert(JSON.stringify(res));
		loader.dismiss();
		this.presentToast("Image uploaded successfully");
	}).catch((err)=> {
		loader.dismiss();
		alert(JSON.stringify(err));
		this.presentToast(err);
	});
  }
  
  presentToast(msg) {
	  
	  let toast = this.toastCtrl.create({
		message: msg,
		duration: 3000,
		position: 'top'
	  });

	  toast.onDidDismiss(() => {
		console.log('Dismissed toast');
	  });

	  toast.present();
  }
}
