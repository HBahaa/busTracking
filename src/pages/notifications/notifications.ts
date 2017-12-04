import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as $ from 'jquery';

import { GetNotificationProvider } from '../../providers/get-notification/get-notification';


@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
  providers: [GetNotificationProvider]
})
export class NotificationsPage {

  // items: Array<{title: string, data: string, date: string}>= [];
  items: any= [];

  constructor(public navCtrl: NavController, private storage: Storage, private getNotificationProvider: GetNotificationProvider) {

  }

  ionViewDidLoad(){

    console.log("ionViewDidLoad");

    let msg = [];
    this.storage.get("children").then((result)=>{
      // let children = result;

      $.each(result, (index, child)=>{
        this.storage.get(child.tag).then((final)=>{
          msg.push(...final);
          msg.sort ((a, b)=> {
            return (a.timestamp > b.timestamp) ? -1 : ((b.timestamp > a.timestamp) ? 1 : 0);
          });          

          return msg
        })
        .then((items)=>{
          this.items = items.filter((items, index, self) =>
            index === self.findIndex((t) => (
              t.timestamp === items.timestamp && t.sid === items.sid && t.status === items.status
            ))
          )
        })
        .catch((error1)=>{
          alert("error1");
        })

      });

    });
  }
}
