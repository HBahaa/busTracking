import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import { ChildrenPage } from '../children/children';
import { Register1Page } from '../register1/register1';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {
  id: any;
  password: any;


  constructor(public navCtrl: NavController, public http: Http, public storage: Storage, private menuCtrl: MenuController) {
  }

  ionViewDidEnter() {
    this.menuCtrl.enable(false);
  }

  login() {
    this.menuCtrl.enable(true);
    this.navCtrl.setRoot(ChildrenPage);
  }

  createAccount(){
    this.menuCtrl.enable(false);
    this.navCtrl.setRoot(Register1Page);
  }

}
