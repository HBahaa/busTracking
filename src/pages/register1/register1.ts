import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  validations_form    : FormGroup;

  constructor(public navCtrl: NavController, public http: Http, public storage: Storage) {
  }


  ionViewWillLoad() {

    this.validations_form = new FormGroup({
      id: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{14}$')]),
      skey: new FormControl('', [Validators.required, Validators.min(144311),Validators.max(84813736161378)])
    });

  }

  onSubmit(data){
    // console.log("data._value", data._value);  //Object {id: "12345678901234", skey: "144311"}
    this.navCtrl.setRoot(MapPage);
  }

  alreadyHaveAccount(){
    this.navCtrl.setRoot(LoginPage);
  }

}
