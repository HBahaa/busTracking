var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, MenuController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import * as $ from 'jquery';
import { ChildrenPage } from '../children/children';
import { MapPage } from '../map/map';
var Register2Page = /** @class */ (function () {
    function Register2Page(navCtrl, navParams, menuCtrl, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.menuCtrl = menuCtrl;
        this.storage = storage;
        this.address = this.navParams.get('param1');
        // this.address = "طفنيس المطاعنه";
        // this.location = {"lat":"25.4306841","lng":"32.5261475"};
        this.location = this.navParams.get('param2');
        this.user = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(4)]),
            // email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z-]+.[a-zA-Z0-9-.]+$')]),
            address: new FormControl(this.address),
            mob: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{11}$')]),
            password: new FormControl('', [Validators.minLength(5), Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')])
        });
    }
    Register2Page.prototype.ionViewWillLoad = function () {
    };
    Register2Page.prototype.onSubmit = function (user) {
        var _this = this;
        console.log("user=", user._value);
        this.menuCtrl.enable(true);
        this.storage.get('userData').then(function (data) {
            var nid = data.id;
            var secureCode = data.skey;
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "http://ec2-18-220-223-50.us-east-2.compute.amazonaws.com:9876/notsecure/register?nid=" + nid + "&secureCode=" + secureCode + "&name=" + user._value.name + "&locLat=" + _this.location.lat + "&locLong=" + _this.location.lng + "&locDesc=" + user._value.address + "&password=" + user._value.password,
                "method": "POST",
                "headers": {
                    "content-type": "application/json",
                    "cache-control": "no-cache",
                    "postman-token": "4a53920c-7605-4383-bde5-db03b13e1214",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Key",
                    "Access-Control-Allow-Origin": "*"
                }
            };
            $.ajax(settings).done(function (response) {
                console.log(response);
                if (response.success) {
                    _this.navCtrl.setRoot(ChildrenPage);
                }
                else {
                    alert("user not allowed to register");
                }
            }).catch(function (error) {
                alert("error");
            });
        });
    };
    Register2Page.prototype.RegisterFN = function () {
        this.menuCtrl.enable(true);
        this.navCtrl.setRoot(ChildrenPage);
    };
    Register2Page.prototype.locateMe = function () {
        this.navCtrl.setRoot(MapPage);
    };
    Register2Page = __decorate([
        Component({
            selector: 'page-register2',
            templateUrl: 'register2.html'
        }),
        __metadata("design:paramtypes", [NavController, NavParams, MenuController, Storage])
    ], Register2Page);
    return Register2Page;
}());
export { Register2Page };
//# sourceMappingURL=register2.js.map