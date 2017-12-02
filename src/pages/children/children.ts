import { Component } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from 'ionic-native';
import { Storage } from '@ionic/storage';
import * as $ from 'jquery';
import * as io from "socket.io-client";


import { DetailsPage } from '../details/details';
import { NotificationsPage } from '../notifications/notifications';
import { GetNotificationProvider } from '../../providers/get-notification/get-notification';
import { LastNotificationProvider } from '../../providers/last-notification/last-notification';
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
				private alertCtrl: AlertController, private getChildrenProvider: GetChildrenProvider,
				private lastNotificationProvider: LastNotificationProvider) {	

		this.serverConnection();

		platform.ready().then(() => {

			this.backgroundMode.on("activate").subscribe(() => {
				console.log('activated');
				LocalNotifications.on('click', (notification, state) => {
					this.navCtrl.setRoot(NotificationsPage)
					// let json = JSON.parse(notification.data);
					// let confirm = this.alertCtrl.create({
					// 	title: notification.status,
					// 	message: json.msg,
					// 	buttons: [
					// 		// {
					// 		// 	text: 'No',
					// 		// 	handler: () => {
					// 		// 		console.log('Disagree clicked');
					// 		// 		confirm.dismiss();
					// 		// 	}
					// 		// },
					// 		{
					// 			text: 'Ok',
					// 			handler: () => {
					// 		    	// console.log('Agree clicked');
					// 		    	// this.navCtrl.push(DetailsPage, {'param1': json.sid});
					// 		    	confirm.dismiss()
					// 			}
					// 		}
					// 	]
				 //    });
				 //    confirm.present();
				});
			});
			this.backgroundMode.enable();
			
		}).catch((error) => {
			alert("error 1: "+ error);
		});
	}

	ionViewDidLoad(){
		console.log("ionViewDidLoad")
		this.storage.get("children").then((res)=>{

			if(res != null ){
				this.storage.get(res[0].tag).then((data)=>{
					if (data != null) {
						this.children = res;
					}else{
						this.storage.get("token").then((token)=>{
							this.getNotificationProvider.getNotification(token).then((data) => {
								this.children = data;
							}).catch((error5)=>{
								console.log("error5")
							});
						}).catch((error4)=>{
							alert("error4 can't get token")
						})	
					}
				})	
			}else{
				this.storage.get("token").then((token)=>{
					this.getNotificationProvider.getNotification(token).then((data) => {
						this.children = data;
					}).catch((error3)=>{
						console.log("error3")
					});
				}).catch((error2)=>{
					alert("error2 can't get token")
				})	
			}
		}).catch((error1)=>{
			console.log("error1")
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

				this.socket.emit("set", { "topics": rooms });
				console.log("socket")

				this.socket.on("serverpublisher", (data) => {
					alert("serverpublisher "+ data);

					this.items[0] = {
						id: 1,
						title: data.status,
						text: data.msg,
						data: data,
						at: new Date(new Date().getTime())
					}
					this.scheduleNotification();

					let id = data.sid


					this.storage.get("token").then((token)=>{
						this.getNotificationProvider.getNotification(token).then((data) => {
							console.log("data")
						}).catch((error7)=>{
							console.log("error5");
						});
					}).catch((error6)=>{
						alert("error4 can't get token")
					})

					this.storage.get("children").then((ch)=>{
						if (ch != null || ch != undefined) {
							$.each(ch, (index, child)=>{
								if (id == child.tag) {
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



				this.socket.emit("castUp", 'castup');

				this.socket.on("castDo", (data) => {
					

				});

			})
			
		})	
	}

}
