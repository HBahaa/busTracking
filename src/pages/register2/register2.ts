import { Component } from '@angular/core';
import { NavController, MenuController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ChildrenPage } from '../children/children';
import { MapPage } from '../map/map';

@Component({
  selector: 'page-register2',
  templateUrl: 'register2.html'
})

export class Register2Page {

  address : any;
  location: any;
  user    : FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController) {
    this.address = this.navParams.get('param1');
    this.location = this.navParams.get('param2');

    this.user = new FormGroup({
      // name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z-]+.[a-zA-Z0-9-.]+$')]),
      address: new FormControl(this.address),
      mob: new FormControl('', [Validators.required,Validators.pattern('^[0-9]{11}$')]),
      password: new FormControl('', [Validators.minLength(5),Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')])
    });
  }
  
  ionViewWillLoad() {

  }

  onSubmit(user){
    console.log("user=", user._value);
    this.menuCtrl.enable(true);
    this.navCtrl.setRoot(ChildrenPage);
  }

  RegisterFN() {
    this.menuCtrl.enable(true);
    this.navCtrl.setRoot(ChildrenPage);
  }

  locateMe()
  {
    this.navCtrl.setRoot(MapPage);
  }
}
