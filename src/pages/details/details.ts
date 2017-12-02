import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as $ from 'jquery';
// import * as io from "socket.io-client";

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {
	messages: any[] = [];
	items: any[] = [];
	childData: any;
	tag: any;
	lastMsg: any;

	constructor(public navCtrl: NavController, private navParams: NavParams, private storage: Storage, private platform: Platform) {

		platform.ready().then(() => {

			this.tag = this.navParams.get("param1");
			this.childData = this.navParams.get("param2");
			this.storage.get(this.tag).then((messages)=>{
				this.messages = messages;
			})

		}).catch((error) => {
			alert("error 1: "+ error);
		});

	}

	ionViewDidLoad(){
		console.log("ionViewDidLoad")
		
	}

}
