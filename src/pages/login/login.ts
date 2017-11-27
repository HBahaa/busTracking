import { Component } from '@angular/core';
import { NavController, MenuController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';
import * as $ from 'jquery';

import { ChildrenPage } from '../children/children';
import { Register1Page } from '../register1/register1';
import { GetChildrenProvider } from '../../providers/get-children/get-children';
import { GetNotificationProvider } from '../../providers/get-notification/get-notification';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  id: any;
  password: any;
  loader:any;

  constructor(public navCtrl: NavController, public storage: Storage, private menuCtrl: MenuController, private loadingCtrl: LoadingController,
              private getChildrenProvider: GetChildrenProvider, private getNotificationProvider: GetNotificationProvider) {
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  }

  login() {
    this.presentLoading();

    this.menuCtrl.enable(true);

    console.log("this.id", this.id)
    console.log("this.password", this.password)
    
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://ec2-18-220-223-50.us-east-2.compute.amazonaws.com:9876/notsecure/login?nid="+this.id+"&password="+this.password,
      "method": "POST",
      "headers": {
        "content-type": "application/json",
        "cache-control": "no-cache",
        "postman-token": "aaf1634c-7a6c-e7eb-ce6f-8f7a0448616b",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Key",
        "Access-Control-Allow-Origin":"*",
        "Allow-Control-Allow-Origin":"*"
      }
    }

    $.ajax(settings).done((response)=> {
     if(response.success)
      {
        this.getChildrenProvider.getAllChildren(response.token).then((flag) => {
          this.storage.set("token", response.token).then(()=>{
            this.getNotificationProvider.getNotification().then((flag)=>{
              this.loader.dismiss();
              this.navCtrl.setRoot(ChildrenPage);
            });
          });
        });
        
      }
      else{
        this.loader.dismiss();
        alert("user not allowed to login")
      }

    }).catch((err)=>{
      this.loader.dismiss();
      alert("error when login,Please check internet connection.")
    });
    
  }

  createAccount(){
    this.menuCtrl.enable(false);
    this.navCtrl.setRoot(Register1Page);
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Loading..."
    });
    this.loader.present();
  }

}
