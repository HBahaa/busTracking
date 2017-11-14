import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';

@Component({
  selector: 'page-children',
  templateUrl: 'children.html'
})
export class ChildrenPage {

	constructor(public navCtrl: NavController) {

	}

	childDetails(){
		this.navCtrl.push(DetailsPage)
	}

}
