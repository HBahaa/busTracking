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
import { NavController, ToastController } from 'ionic-angular';
import { ChildrenPage } from '../children/children';
var ProfilePage = /** @class */ (function () {
    function ProfilePage(navCtrl, toastCtrl) {
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.name = "heba";
        this.email = "heba@yahoo.com";
        this.password = "00000";
        this.phone = "000000";
    }
    ProfilePage.prototype.presentToast = function () {
        var _this = this;
        var toast = this.toastCtrl.create({
            message: "data saved",
            duration: 3000,
            position: 'top'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
            _this.navCtrl.setRoot(ChildrenPage);
        });
        toast.present();
    };
    ProfilePage = __decorate([
        Component({
            selector: 'page-profile',
            templateUrl: 'profile.html'
        }),
        __metadata("design:paramtypes", [NavController, ToastController])
    ], ProfilePage);
    return ProfilePage;
}());
export { ProfilePage };
//# sourceMappingURL=profile.js.map