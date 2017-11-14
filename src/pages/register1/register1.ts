import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { MapPage } from '../map/map';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-register1',
  templateUrl: 'register1.html'
})

export class Register1Page {

  nationalID: string;
  secertKey: string;


  constructor(public navCtrl: NavController, public http: Http, public storage: Storage) {
  }

  authenticationCheck(){
    this.navCtrl.setRoot(MapPage);
  }

  alreadyHaveAccount(){
    this.navCtrl.setRoot(LoginPage);
  }

}
