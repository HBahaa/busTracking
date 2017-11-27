import { Component } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from 'ionic-native';
import { Storage } from '@ionic/storage';
import * as $ from 'jquery';
import * as io from "socket.io-client";


import { DetailsPage } from '../details/details';
import { GetNotificationProvider } from '../../providers/get-notification/get-notification';
import { GetChildrenProvider } from '../../providers/get-children/get-children';

@Component({
  selector: 'page-children',
  templateUrl: 'children.html'
})
export class ChildrenPage {
	children: any = [];
	obj: any;
	socket: any;
	socketHost: String;
	items: any[] = [];

	constructor(public navCtrl: NavController, private storage: Storage, public backgroundMode: BackgroundMode,
				private getNotificationProvider: GetNotificationProvider, private platform: Platform,
				private alertCtrl: AlertController, private getChildrenProvider: GetChildrenProvider) {	

		// this.serverConnection();

		platform.ready().then(() => {
			this.storage.get("children").then((data)=>{
				console.log("data == ", data)
				this.children = data;
			}).catch((error)=>{
				console.log("can't get children from storage");
			});

			// this.backgroundMode.isActive();

			// this.backgroundMode.on("enable").subscribe(() => {
			// 	console.log("enabled")
			// })

			this.backgroundMode.on("activate").subscribe(() => {
				console.log('activated');
				LocalNotifications.on('click', (notification, state) => {
					console.log("notification clicked");
					console.log("state clicked");
					let json = JSON.parse(notification.data);

					let confirm = this.alertCtrl.create({
						title: notification.status,
						message: json.msg,
						buttons: [
							{
								text: 'No',
								handler: () => {
									console.log('Disagree clicked');
									confirm.dismiss();
								}
							},
							{
								text: 'Yes',
								handler: () => {
							    	console.log('Agree clicked');
							    	this.navCtrl.push(DetailsPage, {'param1': json.sid});
							    	confirm.dismiss()
								}
							}
						]
				    });
				    confirm.present();
				});
			});
			this.backgroundMode.enable();
			
		}).catch((error) => {
			alert("error 1: "+ error);
		});
	}

	// ionViewDidLoad(){
	// 	this.getChildrenProvider.getAllChildren("token").then((flag) => {
	// 		if (flag) {
	// 			this.getNotificationProvider.getNotification();
	// 		}
	// 	}).catch((err)=>{
	// 		console.log("errrrror")
	// 	});
	// }

	childDetails(tag,child){
		this.navCtrl.push(DetailsPage, {'param1': tag, 'param2': child})
	}

	scheduleNotification() {
		LocalNotifications.schedule(this.items);
	}

	ionViewWillEnter(){
		console.log("ionViewWillEnter")
	}

	ionViewWillLoad(){
		console.log("ionViewWillLoad");
		
	}

	serverConnection() {
		console.log("serverconnection")

		this.socketHost = "http://ec2-18-220-223-50.us-east-2.compute.amazonaws.com:9000";
		this.socket = io(this.socketHost);
		this.socket.on("connect", (msg) => {
			console.log("connection ")

			this.socket.emit("set", { "topics": ['122122122', '123123123'] });

			this.socket.on("serverpublisher", (data) => {

				console.log("serverpublisher ", data)

				this.getNotificationProvider.getNotification().then((flag)=>{

					if (flag) {

						this.storage.get("children").then((data)=>{
							this.children = data;
						})

						this.items[0] = {
							id: 1,
							title: data.status,
							text: data.msg,
							data: data,
							at: new Date(new Date().getTime())
						}
						this.scheduleNotification();
					}
					else{
						console.log("flag is false")
					}

				}).catch((err)=>{
					console.log("error", err)
				})

			})

			// this.socket.emit("castUp", 'heba');

			// this.socket.on("castDo", (data) => {
			// 	// var settings = {
			// 	// 	"async": true,
			// 	// 	"crossDomain": true,
			// 	// 	"url": `http://ec2-18-220-223-50.us-east-2.compute.amazonaws.com:3000/api/parents?filter[where][name]=${this.uname}`,
			// 	// 	"method": "GET",
			// 	// 	"headers": {
			// 	// 		"cache-control": "no-cache",
			// 	// 		"postman-token": "161fe2ca-1d46-f9af-2134-8dd785b50365"
			// 	// 	}
			// 	// }

			// 	// $.ajax(settings).done((response) => {

			// 	// 	for (let i in response) {
			// 	// 		this.rooms = response[i]['rooms'];
			// 	// 	}
			// 	// 	this.socket.emit("set", { "topics": this.rooms });

			// 	// }).fail((error) => {
			// 	// 	console.log(error)
			// 	// });

			// });
		})

		
	}

}
