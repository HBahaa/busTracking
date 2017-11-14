import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html'
})
export class NotificationsPage {
  selectedItem: any;
  icons: string[];
  items: Array<{title: string, data: string, date: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    this.items = [];

    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        data: 'I\'ve had a pretty messed up day. If we just...',
        date: '22/08/2017'
      });
    }

  }

  notificationDetails(item) {
    this.navCtrl.push(NotificationsPage, {
      item: item
    });
  }
}
