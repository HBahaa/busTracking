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
				$.each(messages, (index, value)=>{
		            let y = this.getDate(value.time);
		            $.extend( value, y );
		        })

          		return messages;
			}).then((messages)=>{
				this.messages = messages;
			})

		}).catch((error) => {
			alert("error 1: "+ error);
		});

	}

	ionViewDidLoad(){
		console.log("ionViewDidLoad")
		
	}

	getDate(timestamp) {

	    timestamp = Number(timestamp);
	    var date = new Date(timestamp);

	    var m = (date.getMonth() + 1);
	    var d = date.getDate();
	    var h = date.getHours();
	    var min = date.getMinutes();
	    var s = date.getSeconds();

	    var formattedDate = (m <= 9 ? '0' + m : m) + "/" + (d <= 9 ? '0' + d : d) + "/" + date.getFullYear();
	    var formattedTime = (h <= 9 ? '0' + h : h) + ":" + (min <= 9 ? '0' + min : min) + ":" + (s <= 9 ? '0' + s : s);

	    return { 'date': formattedDate, 'time': formattedTime };
	}

}
