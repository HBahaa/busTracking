import { Component } from '@angular/core';
import { NavController, MenuController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import * as $ from 'jquery';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController, private storage: Storage) {
    this.address = this.navParams.get('param1');
    // this.address = "طفنيس المطاعنه";
    // this.location = {"lat":"25.4306841","lng":"32.5261475"};
    this.location = this.navParams.get('param2');

    this.user = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      // email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z-]+.[a-zA-Z0-9-.]+$')]),
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

    this.storage.get('userData').then((data)=> {

      let nid= data.id;
      let secureCode = data.skey

      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://ec2-18-220-223-50.us-east-2.compute.amazonaws.com:9876/notsecure/register?nid="+nid+"&secureCode="+secureCode+"&name="+user._value.name+"&locLat="+this.location.lat+"&locLong="+this.location.lng+"&locDesc="+user._value.address+"&password="+user._value.password,
        "method": "POST",
        "headers": {
          "content-type": "application/json",
          "cache-control": "no-cache",
          "postman-token": "4a53920c-7605-4383-bde5-db03b13e1214",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Key",
          "Access-Control-Allow-Origin":"*"
        }
      }

      $.ajax(settings).done((response)=>{
        console.log(response);
        if(response.success)
        {
          this.navCtrl.setRoot(ChildrenPage);
        }
        else{
          alert("user not allowed to register")
        }
        
      }).catch((error)=>{
        alert("error")
      });


    })
    
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
