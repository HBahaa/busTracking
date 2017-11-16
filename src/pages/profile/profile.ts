import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { ChildrenPage } from '../children/children';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})


export class ProfilePage {

	name: string = "heba";
	email: string = "heba@yahoo.com";
	password: string = "00000";
	phone: string = "000000";

	constructor(public navCtrl: NavController, private toastCtrl: ToastController) {

	}

	presentToast() {
	    let toast = this.toastCtrl.create({
	      message: "data saved",
	      duration: 3000,
	      position: 'top'
	    });

	    toast.onDidDismiss(() => {
	      console.log('Dismissed toast');
	      this.navCtrl.setRoot(ChildrenPage)
	    });

	    toast.present();
	}

}
