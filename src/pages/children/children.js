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
import { NavController } from 'ionic-angular';
import { BackgroundMode } from '@ionic-native/background-mode';
import { Storage } from '@ionic/storage';
import { DetailsPage } from '../details/details';
import { GetNotificationProvider } from '../../providers/get-notification/get-notification';
var ChildrenPage = /** @class */ (function () {
    function ChildrenPage(navCtrl, storage, backgroundMode, getNotificationProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.storage = storage;
        this.backgroundMode = backgroundMode;
        this.getNotificationProvider = getNotificationProvider;
        this.children = [];
        this.storage.get("children").then(function (data) {
            console.log("children", data);
            _this.children = data;
        });
        this.getNotificationProvider.getNotification();
    }
    ChildrenPage.prototype.childDetails = function (tag) {
        this.navCtrl.push(DetailsPage);
    };
    ChildrenPage = __decorate([
        Component({
            selector: 'page-children',
            templateUrl: 'children.html'
        }),
        __metadata("design:paramtypes", [NavController, Storage, BackgroundMode,
            GetNotificationProvider])
    ], ChildrenPage);
    return ChildrenPage;
}());
export { ChildrenPage };
//# sourceMappingURL=children.js.map