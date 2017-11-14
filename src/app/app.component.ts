import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TranslateService } from '@ngx-translate/core';

import { HomePage } from '../pages/home/home';
import { NotificationsPage } from '../pages/notifications/notifications';
import { ProfilePage } from '../pages/profile/profile';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{icon: string, title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
    private translateService: TranslateService) {

    // this.initializeApp();

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      translateService.setDefaultLang('en');
      translateService.use('en');            
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { icon: 'contacts',title: 'My Children', component: HomePage },
      { icon: 'notifications',title: 'Notifications', component: NotificationsPage },
      { icon: 'person',title: 'Profile', component: ProfilePage }
    ];

  }

  // initializeApp() {
    
  // }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  userLogout(){
    this.nav.setRoot(LoginPage);
  }
}
