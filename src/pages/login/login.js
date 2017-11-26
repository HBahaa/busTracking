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
import { NavController, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import * as $ from 'jquery';
import { ChildrenPage } from '../children/children';
import { Register1Page } from '../register1/register1';
import { GetChildrenProvider } from '../../providers/get-children/get-children';
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, storage, menuCtrl, getChildrenProvider) {
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.menuCtrl = menuCtrl;
        this.getChildrenProvider = getChildrenProvider;
    }
    LoginPage.prototype.ionViewDidEnter = function () {
        this.menuCtrl.enable(false);
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        this.menuCtrl.enable(true);
        console.log("this.id", this.id);
        console.log("this.password", this.password);
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "http://ec2-18-220-223-50.us-east-2.compute.amazonaws.com:9876/notsecure/login?nid=" + this.id + "&password=" + this.password,
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "cache-control": "no-cache",
                "postman-token": "aaf1634c-7a6c-e7eb-ce6f-8f7a0448616b",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Key",
                "Access-Control-Allow-Origin": "*",
                "Allow-Control-Allow-Origin": "*"
            }
        };
        $.ajax(settings).done(function (response) {
            if (response.success) {
                _this.getChildrenProvider.getAllChildren(response.token).then(function (flag) {
                    _this.storage.set("token", response.token).then(function () {
                        _this.navCtrl.setRoot(ChildrenPage);
                    });
                });
            }
            else {
                alert("user not allowed to register");
            }
        }).catch(function (err) {
            alert("error when login");
        });
    };
    LoginPage.prototype.createAccount = function () {
        this.menuCtrl.enable(false);
        this.navCtrl.setRoot(Register1Page);
    };
    LoginPage = __decorate([
        Component({
            selector: 'page-login',
            templateUrl: 'login.html'
        }),
        __metadata("design:paramtypes", [NavController, Storage, MenuController,
            GetChildrenProvider])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map