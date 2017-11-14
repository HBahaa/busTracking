import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, CameraPosition, MarkerOptions,Marker } from '@ionic-native/google-maps';

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

 
    constructor(public navCtrl: NavController, public platform: Platform, private googleMaps: GoogleMaps) {
        platform.ready().then(() => {
            this.loadMap();
        });
    }
 
loadMap() {

  let mapOptions: GoogleMapOptions = {
    camera: {
      // target: {
      //   lat: 43.0741904,
      //   lng: -89.3809802
      // },
      zoom: 18,
      tilt: 15
    }
  };

  this.map = this.googleMaps.create('map', mapOptions);

    this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
        console.log('Map is ready!');
        this.map.addEventListener(GoogleMapsEvent.MAP_CLICK).subscribe((data)=>{

          this.lat = data[0]['lat'];
          this.lng = data[0]['lng'];

          this.getAddress(this.lat, this.lng);
          this.location = {'lat': this.lat, 'lng': this.lng}

        })

        this.map.getMyLocation().then((location)=>{

          this.lat = location['latLng']['lat'];
          this.lng = location['latLng']['lng'];

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
        // alert("from" + this.address);          // if address found, pass to processing function
      
      } else {
        alert("Geocode failure: " + status);                // alert any other error(s)
        return false;
      }
    });
  }


  codeAddress() {
    // console.log(ev.target.value);

    if (this.searchQuery != '') {
      var geocoder  = new google.maps.Geocoder();              // create a geocoder object

      geocoder.geocode( { 'address': this.searchQuery},(results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {

          this.map.clear().then(()=>{
            this.map.addMarker({
              title: this.searchQuery,
              icon: 'red',
              animation: 'DROP',
              position: results[0].geometry.location 
            })

            this.address = this.searchQuery;
            this.location = results[0].geometry.location;

            this.searchQuery = '';

          }).catch(()=>{
            console.log("clear map")
          })

        } else {
          alert("Geocode was not successful for the following reason: " + status);
        }
      });
    }
  }

  goToRegister(){
    this.navCtrl.setRoot(Register2Page, {'param1': this.address, 'param2': this.location})
  }

}