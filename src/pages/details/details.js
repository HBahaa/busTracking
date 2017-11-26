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
import { NavController, NavParams, Platform } from 'ionic-angular';
import { BackgroundMode } from '@ionic-native/background-mode';
import { LocalNotifications } from 'ionic-native';
import { Storage } from '@ionic/storage';
var DetailsPage = /** @class */ (function () {
    function DetailsPage(navCtrl, navParams, storage, backgroundMode, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.backgroundMode = backgroundMode;
        this.platform = platform;
        this.messages = [];
        this.items = [];
        platform.ready().then(function () {
            _this.childData = _this.navParams.get("param1");
            _this.lastMsg = _this.navParams.get("param2");
            _this.backgroundMode.isActive();
            _this.backgroundMode.on("enable").subscribe(function () {
                console.log("enabled");
            });
            _this.backgroundMode.on("activate").subscribe(function () {
                console.log('activated');
                LocalNotifications.on('click', function (notification, state) {
                    var json = JSON.parse(notification.data);
                });
            });
            _this.backgroundMode.enable();
        }).catch(function (error) {
            alert("error 1: " + error);
        });
    }
    DetailsPage.prototype.ionViewDidLoad = function () {
    };
    DetailsPage.prototype.scheduleNotification = function () {
        LocalNotifications.schedule(this.items);
    };
    DetailsPage = __decorate([
        Component({
            selector: 'page-details',
            templateUrl: 'details.html'
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Storage,
            BackgroundMode, Platform])
    ], DetailsPage);
    return DetailsPage;
}());
export { DetailsPage };
//# sourceMappingURL=details.js.map