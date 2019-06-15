import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Platform, NavController, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage'
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent {

  public appPages = [
    {
      title: 'Login',
      url: '/',
      icon: 'lock'
    },
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    },{
      title:'Document Reader',
      url:'/viewer',
      icon:'document'
    }
  ];
meetings:any=[];
login_token:any=[];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private nativeStorage: NativeStorage,
    public http: HttpClient,
    public navCtrl: NavController,
    private loadingCtrl:LoadingController,
    public storage: Storage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout(){
    console.log('logout');
    this.storage.set('ba_auth', null).then(() => {
      this.storage.get('ba_auth').then((val) => {
          if (val == null) {
            this.navCtrl.navigateRoot('lander');
          }
      });
    });

  }
   


}
