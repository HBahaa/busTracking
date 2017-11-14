import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ChildrenPage } from '../children/children';


@Component({
  selector: 'page-register2',
  templateUrl: 'register2.html'
})

export class Register2Page {

  address: any;
  location: any;
  username: string;
  email   : string;
  phone   : Number;
  password: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.address = this.navParams.get('param1');
    this.location = this.navParams.get('param2');
  }


  ionViewDidLoad(){
  }
  
  RegisterFN() {
    this.navCtrl.setRoot(ChildrenPage);
  }


}
