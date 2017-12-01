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
            return (a.time > b.time) ? -1 : ((b.time > a.time) ? 1 : 0);
          });          

          return msg
        })
        // .then((msg)=>{
          
        //   $.each(msg, (index, value)=>{
        //     // console.log("value", JSON.stringify(value))
        //     let y = this.getDate(value.time);
        //     $.extend( value, y );
        //   })

        //   return msg;

        // })
        .then((items)=>{

          this.items = items;

        }).catch((error1)=>{
          alert("error1");
        })

      });

    });
  }

  // getDate(timestamp) {

  //   timestamp = Number(timestamp);
  //   var date = new Date(timestamp);

  //   var m = (date.getMonth() + 1);
  //   var d = date.getDate();
  //   var h = date.getHours();
  //   var min = date.getMinutes();
  //   var s = date.getSeconds();

  //   var formattedDate = (m <= 9 ? '0' + m : m) + "/" + (d <= 9 ? '0' + d : d) + "/" + date.getFullYear();
  //   var formattedTime = (h <= 9 ? '0' + h : h) + ":" + (min <= 9 ? '0' + min : min) + ":" + (s <= 9 ? '0' + s : s);

  //   return { 'date': formattedDate, 'time': formattedTime };
  // }
}
