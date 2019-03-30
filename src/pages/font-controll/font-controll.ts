import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
 
/**
 * Generated class for the FontControllPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-font-controll',
  templateUrl: 'font-controll.html',
})
export class FontControllPage {
  posts: any;
  username: any;
  password: any;
  gender: any;
  constructor(public navCtrl: NavController, 
			  public navParams: NavParams,
			  public http: HttpClient,
			  public alertCtrl: AlertController,
			  public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FontControllPage');
    this.http.get("https://www.tworksystem.com/wp-json/wp/v2/posts").subscribe((res) => {
		this.posts = res;
		console.log(res);
	});
  }
  
 
  showAlertZawGyi() {
    const alert = this.alertCtrl.create({
      title: 'ဟလို',
      subTitle: 'နာမည္ =  '+ this.username + '<br>လွ်ို့ဝွက္နံပါတ္ = ' +this.password+ '<br>လိင္ = ' +this.gender,
      buttons: ['OK']
    });
    alert.present();
  }
  
  toastCtl() {
	const toast = this.toastCtrl.create({
      message: 'လိုိုအပ္ေသာ Configuration tools မ်ားလည္းတစ္ပါးတည္း တပ္ဆင္ေပးျပီးျဖစ္ပါသည္။',
      duration: 3000
    });
    toast.present();
  }

}
