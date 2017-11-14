import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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
  nationalID: string;
  password: string;


  constructor(public navCtrl: NavController, public http: Http, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.navCtrl.setRoot(ChildrenPage);
  }

  createAccount(){
    this.navCtrl.setRoot(Register1Page);
  }

}
