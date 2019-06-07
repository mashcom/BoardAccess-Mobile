import { Component } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Platform, NavController, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IMeeting, MeetingProvider } from 'src/providers/meeting/meeting';
import { ListPage } from './list/list.page';
import { FileTransferObject } from '@ionic-native/file-transfer/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})

export class AppComponent {
 const
  ENDPOINT = "http://localhost:8080/laravel/api/public/";
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
    public http: HttpClient,public navCtrl: NavController,private _meeting_provider: MeetingProvider,private loadingCtrl:LoadingController
  ) {
    this.initializeApp();
    
    
    this._meeting_provider.login().subscribe((data)=>{
      this.login_token = data;
      
      console.log("aUTH")
       console.log(data);

       this._meeting_provider.get_meetings(this.login_token.access_token).subscribe((data)=>{
        console.log("Meetings")
        this.meetings = data;
        console.log(data);
      
      },(error)=>{
        console.log(error);
      });
     },(error)=>{
       console.log(error);
       
     });
   
    
   
  }
  

  initializeApp() {
    this.platform.ready().then(() => {
     
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
   


}
