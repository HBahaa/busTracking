import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {
	
	items: Array<{title: string, data: string, date: string}>;

	constructor(public navCtrl: NavController) {

		this.items = [];
	    for (let i = 1; i < 11; i++) {
	      this.items.push({
	        title: 'Item ' + i,
	        data: 'I\'ve had a pretty messed up day. If we just...',
	        date: '22/08/2017'
	      });
	    }

	}

}
