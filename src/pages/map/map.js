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
import { NavController, Platform, ToastController } from 'ionic-angular';
import { GoogleMaps, GoogleMapsEvent } from '@ionic-native/google-maps';
import { Register2Page } from '../register2/register2';
var MapPage = /** @class */ (function () {
    function MapPage(navCtrl, platform, googleMaps, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.googleMaps = googleMaps;
        this.toastCtrl = toastCtrl;
        platform.ready().then(function () {
            _this.loadMap();
            _this.presentToast('Select your location, you can click on map to select you home or from search box  then click Next', 5000, 'top');
        });
    }
    MapPage.prototype.loadMap = function () {
        var _this = this;
        var mapOptions = {
            camera: {
                zoom: 18,
                tilt: 15
            }
        };
        this.map = this.googleMaps.create('map', mapOptions);
        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(function () {
            console.log('Map is ready!');
            _this.map.addEventListener(GoogleMapsEvent.MAP_CLICK).subscribe(function (data) {
                _this.map.clear().then(function () {
                    _this.lat = data[0]['lat'];
                    _this.lng = data[0]['lng'];
                    var mapOption = {
                        camera: {
                            target: {
                                lat: _this.lat,
                                lng: _this.lng
                            },
                            zoom: 15,
                            tilt: 30
                        }
                    };
                    _this.map.setOptions(mapOption);
                    _this.map.setMyLocationEnabled(true);
                    // Now you can use all methods safely.
                    _this.map.addMarker({
                        title: "your location",
                        icon: 'red',
                        animation: 'DROP',
                        position: {
                            lat: _this.lat,
                            lng: _this.lng
                        }
                    });
                    _this.getAddress(_this.lat, _this.lng);
                    _this.location = { 'lat': _this.lat, 'lng': _this.lng };
                });
            });
            _this.map.getMyLocation().then(function (location) {
                _this.lat = location['latLng']['lat'];
                _this.lng = location['latLng']['lng'];
                var mapOption = {
                    camera: {
                        target: {
                            lat: _this.lat,
                            lng: _this.lng
                        },
                        zoom: 15,
                        tilt: 30
                    }
                };
                _this.map.setOptions(mapOption);
                _this.map.setMyLocationEnabled(true);
                // Now you can use all methods safely.
                _this.map.addMarker({
                    title: "your location",
                    icon: 'red',
                    animation: 'DROP',
                    position: {
                        lat: _this.lat,
                        lng: _this.lng
                    }
                });
                _this.getAddress(_this.lat, _this.lng);
                _this.location = { 'lat': _this.lat, 'lng': _this.lng };
            });
            _this.map.setMyLocationEnabled(true);
            // this.map.addEventListener(GoogleMapsEvent.MY_LOCATION_BUTTON_CLICK).subscribe(()=>{
            // 	console.log("my location button click")
            // }) 
        });
        // Wait the MAP_READY before using any methods.
        // this.map.one(GoogleMapsEvent.MAP_READY)
        //   .then(() => {
        //     console.log('Map is ready!');
        //     this.map.getMyLocation().then((res)=>{
        //       this.lat = res['latLng']['lat'];
        //       this.lng = res['latLng']['lng'];
        //       this.getAddress(this.lat, this.lng);
        //     this.map.remove().then(()=>{
        //     	console.log("removed")
        //     }).catch(()=>{
        //     	console.log("error on removeing map")
        //     })
        //         let mapOption: GoogleMapOptions = {
        //           camera: {
        //             target: {
        //               lat: this.lat,
        //               lng: this.lng
        //             },
        //             zoom: 18,
        //             tilt: 30
        //           }
        //         };
        //       this.map.setOptions(mapOption);
        //       this.map.setMyLocationEnabled(true);
        //       // Now you can use all methods safely.
        //       this.map.addMarker({
        //         title: "your location",
        //         icon: 'red',
        //         animation: 'DROP',
        //         position: {
        //           lat: this.lat,
        //           lng: this.lng
        //         }
        //       })
        //       .then(marker => {
        //         marker.on(GoogleMapsEvent.MARKER_CLICK)
        //           .subscribe(() => {
        //             alert("clicked")
        //           });
        //       });
        //     });
        //   });
    };
    // function to geocode a lat/long
    MapPage.prototype.getAddress = function (myLatitude, myLongitude) {
        var _this = this;
        var geocoder = new google.maps.Geocoder(); // create a geocoder object
        var location = new google.maps.LatLng(myLatitude, myLongitude); // turn coordinates into an object
        geocoder.geocode({ 'latLng': location }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                _this.address = results[0].formatted_address;
                // alert("from" + this.address);          // if address found, pass to processing function
            }
            else {
                alert("Geocode failure: " + status); // alert any other error(s)
                return false;
            }
        });
    };
    MapPage.prototype.codeAddress = function () {
        var _this = this;
        if (this.searchQuery != undefined) {
            var geocoder = new google.maps.Geocoder(); // create a geocoder object
            geocoder.geocode({ 'address': this.searchQuery }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    _this.map.clear().then(function () {
                        _this.map.addMarker({
                            title: _this.searchQuery,
                            icon: 'red',
                            animation: 'DROP',
                            position: results[0].geometry.location
                        });
                        _this.address = _this.searchQuery;
                        _this.location = results[0].geometry.location;
                        var mapOption = {
                            camera: {
                                target: _this.location,
                                zoom: 10,
                                tilt: 30
                            }
                        };
                        _this.map.setOptions(mapOption);
                        _this.searchQuery = '';
                    }).catch(function () {
                        console.log("clear map");
                    });
                }
                else {
                    alert("Geocode was not successful for the following reason: " + status);
                }
            });
        }
        else if (this.searchQuery == undefined) {
            console.log("this.searchQuery", this.searchQuery);
            this.presentToast('Please enter address in search box or click Next', 4000, "bottom");
        }
    };
    MapPage.prototype.presentToast = function (msg, t, pos) {
        var toast = this.toastCtrl.create({
            message: msg,
            duration: t,
            position: pos
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    MapPage.prototype.goToRegister = function () {
        this.navCtrl.setRoot(Register2Page, { 'param1': this.address, 'param2': this.location });
    };
    MapPage = __decorate([
        Component({
            selector: 'map-page',
            templateUrl: 'map.html'
        }),
        __metadata("design:paramtypes", [NavController, Platform, GoogleMaps, ToastController])
    ], MapPage);
    return MapPage;
}());
export { MapPage };
//# sourceMappingURL=map.js.map