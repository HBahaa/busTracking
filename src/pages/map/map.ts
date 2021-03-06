import { Component } from '@angular/core';
import { NavController, Platform, ToastController } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions } from '@ionic-native/google-maps';

import { Register2Page } from '../register2/register2';

declare var google;

@Component({
  selector: 'map-page',
  templateUrl: 'map.html'
})
export class MapPage {
 
    map: GoogleMap;
    lat: any;
    lng: any;
    location: any;
    address: any;
    searchQuery: any;

 
    constructor(public navCtrl: NavController, public platform: Platform, private googleMaps: GoogleMaps, private toastCtrl: ToastController) {
        platform.ready().then(() => {
            this.loadMap();
            this.presentToast('Select your location, you can click on map to select you home or from search box  then click Next', 5000, 'top');
        });
    }
 
loadMap() {

  let mapOptions: GoogleMapOptions = {
    camera: {
      zoom: 18,
      tilt: 15
    }
  };

  this.map = this.googleMaps.create('map', mapOptions);

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
        console.log('Map is ready!');

        this.map.addEventListener(GoogleMapsEvent.MAP_CLICK).subscribe((data)=>{

          this.map.clear().then(()=>{
            this.lat = data[0]['lat'];
            this.lng = data[0]['lng'];

            let mapOption: GoogleMapOptions = {
                camera: {
                  target: {
                    lat: this.lat,
                    lng: this.lng
                  },
                  zoom: 15,
                  tilt: 30
                }
              };

            this.map.setOptions(mapOption);
            this.map.setMyLocationEnabled(true);

            // Now you can use all methods safely.
            this.map.addMarker({
              title: "your location",
              icon: 'red',
              animation: 'DROP',
              position: {
                lat: this.lat,
                lng: this.lng
              }
            })

            this.getAddress(this.lat, this.lng);
            this.location = {'lat': this.lat, 'lng': this.lng}

          });

          
        })

        this.map.getMyLocation().then((location)=>{
          this.lat = location['latLng']['lat'];
          this.lng = location['latLng']['lng'];
          let mapOption: GoogleMapOptions = {
              camera: {
                target: {
                  lat: this.lat,
                  lng: this.lng
                },
                zoom: 15,
                tilt: 30
              }
            };

          this.map.setOptions(mapOption);
          this.map.setMyLocationEnabled(true);

          // Now you can use all methods safely.
          this.map.addMarker({
            title: "your location",
            icon: 'red',
            animation: 'DROP',
            position: {
              lat: this.lat,
              lng: this.lng
            }
          })

          this.getAddress(this.lat, this.lng);
          this.location = {'lat': this.lat, 'lng': this.lng}
        })

        this.map.setMyLocationEnabled(true);

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


  }

  // function to geocode a lat/long
  getAddress(myLatitude,myLongitude) {
    
    var geocoder  = new google.maps.Geocoder();              // create a geocoder object
    var location  = new google.maps.LatLng(myLatitude, myLongitude);    // turn coordinates into an object
       
    geocoder.geocode({'latLng': location}, (results, status) => {
      if(status == google.maps.GeocoderStatus.OK) {            // if geocode success
        this.address = results[0].formatted_address;       
      } else {
        alert("Geocode failure: " + status);                // alert any other error(s)
        return false;
      }
    });
  }


  codeAddress() {

    let loc = {};

    if (this.searchQuery != undefined) {
      var geocoder  = new google.maps.Geocoder();              // create a geocoder object

      geocoder.geocode( { 'address': this.searchQuery},(results, status) => {

        loc["lat"] = results[0].geometry.location.lat();
        loc["lng"] = results[0].geometry.location.lng();

        if (status == google.maps.GeocoderStatus.OK) {

          this.map.clear().then(()=>{
            this.map.addMarker({
              title: this.searchQuery,
              icon: 'red',
              animation: 'DROP',
              position: results[0].geometry.location
            })

            this.address = this.searchQuery;
            this.location = loc;

            let mapOption: GoogleMapOptions = {
              camera: {
                target: this.location,
                zoom: 10,
                tilt: 30
              }
            };

            this.map.setOptions(mapOption);

            this.searchQuery = '';

          }).catch(()=>{
            console.log("clear map")
          })

        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }
      });
    }
    else if (this.searchQuery == undefined) {

      console.log("this.searchQuery", this.searchQuery);
      this.presentToast('Please enter address in search box or click Next', 4000, "bottom");
    }
  }

  presentToast(msg, t, pos) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: t,
      position: pos
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  goToRegister(){
    this.navCtrl.setRoot(Register2Page, {'param1': this.address, 'param2': this.location})
  }

}