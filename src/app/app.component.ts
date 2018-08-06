import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

import { FcmProvider } from '../providers/fcm/fcm';
import { ToastController } from 'ionic-angular';
// import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(fcm: FcmProvider, toastCtrl: ToastController, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      fcm.getToken();

      fcm.listentToNotifications().pipe(
        tap(msg => {
          const toast = toastCtrl.create({
            message: msg.body,
            duration: 3000
          });
          toast.present();
        })
      ).subscribe()
            
    });
  }
}
