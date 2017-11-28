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
  templateUrl: 'children.html',
  providers: [GetChildrenProvider, GetNotificationProvider]
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

		this.serverConnection();

		platform.ready().then(() => {

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

	ionViewDidLoad(){
		// console.log("ionViewDidLoad")
		// this.getChildrenProvider.getAllChildren("response.token").then((flag) => {
  //           if (flag) {
  //           	console.log("flag", flag)
  //             // this.storage.set("token",response.token);
	 //              this.getNotificationProvider.getNotification("token").then((data) => {
		// 			this.children = data;
		// 		}).catch((err)=>{
		// 			console.log("errrrror")
		// 		});
  //           }else{
  //             alert("flag false in getting children")
  //           }
            
  //         });
		this.storage.get("token").then((token)=>{
			this.getNotificationProvider.getNotification(token).then((data) => {
				this.children = data;
			}).catch((err)=>{
				console.log("errrrror")
			});
		}).catch((err)=>{
			alert("can't get token")
		})
		
	}

	childDetails(tag,child){
		this.navCtrl.push(DetailsPage, {'param1': tag, 'param2': child})
	}

	scheduleNotification() {
		LocalNotifications.schedule(this.items);
	}

	serverConnection() {

		console.log("serverconnection")
		this.socketHost = "http://ec2-18-220-223-50.us-east-2.compute.amazonaws.com:9000";
		this.socket = io(this.socketHost);
		this.socket.on("connect", (msg) => {
			console.log("connection ")
			this.storage.get("rooms").then((rooms)=>{

				console.log("rooms", rooms)

				this.socket.emit("set", { "topics": ["123123123", "122122122"] });
				console.log("socket")

				this.socket.on("serverpublisher", (data) => {
					// console.log("serverpublisher ", data);

					this.items[0] = {
						id: 1,
						title: data.status,
						text: data.msg,
						data: data,
						at: new Date(new Date().getTime())
					}
					this.scheduleNotification();

					let id = data.sid
					// console.log("id"+ id)
					this.storage.get("children").then((ch)=>{
						// alert("children"+ ch)
						if (ch != null || ch != undefined) {
							$.each(ch, (index, child)=>{
								// alert("child")
								if (child.tag == id) {
									// alert("equal")
									child.lastMsg = data;
								}
							});
							this.children = ch;
							this.storage.set("children", ch);
						}
						else{
							console.log("not found")
						}
					})

					

				})
			})
			
		})

		
	}

}
