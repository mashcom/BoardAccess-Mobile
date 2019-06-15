import { Component, OnInit } from '@angular/core';
import { MenuController, LoadingController, NavController } from '@ionic/angular';
import { MeetingProvider } from 'src/providers/meeting/meeting';
import { Storage } from '@ionic/storage'
import { Router } from '@angular/router';
import { HomePage } from '../home/home.page';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-lander',
  templateUrl: './lander.page.html',
  styleUrls: ['./lander.page.scss'],
})
export class LanderPage implements OnInit {
    login_token: any = [];
    email: string;
    password: string;
    loading:any;
  constructor( private router: Router,private menuCtrl: MenuController, 
    private _meeting_provider: MeetingProvider,
    private loadingController: LoadingController,
    public storage: Storage,
    public navCtrl: NavController,
    private toastCtrl:ToastController) { 
    menuCtrl.enable(false);
    this.storage.get('ba_auth').then((auth) => {
      if (auth != null) {
        this.router.navigate(['/home']);
        console.log("user logged")
    }
  });
  }

  ngOnInit() {
  }

  login(){
    this.loadingController.create({
      message: 'Please wait...'
    }).then((res) => {
     res.present();
    });
  
    this._meeting_provider.login(this.email,this.password).subscribe((data:any) => {
      this.loadingController.dismiss();
      console.log("Login");
      console.log(data);
      this.login_token = data;
      console.log("seting storage");
      this.storage.set("ba_auth",this.login_token).then(()=>{
        this.storage.get('ba_auth').then((auth) => {
          if (auth.access_token != null) {
            this.presentToast("Login Successful");
            this.navCtrl.navigateForward('home');
            console.log("user logged")
          }
        });
      });
    
      
      
  }, (error) => {
    this.loadingController.dismiss();
    if(error.status==401){
     this.presentToast("Invalid credentials");
    }
    else{
      this.presentToast("Network Error");
    }
      console.log("error");
      console.log(error.status);
  });
  }

  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 5000
    });
    toast.present();
  }

}
