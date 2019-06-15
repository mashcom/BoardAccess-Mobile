import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IMeeting, MeetingProvider } from 'src/providers/meeting/meeting';
import { HttpClient } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  meetings:any;
  login_token:any=[];
  http_error:any;
  constructor(
    private router: Router,
    public http: HttpClient,
    public navCtrl: NavController,
    private _meeting_provider: MeetingProvider,
    public storage: Storage) {
    this.get_user_meetings();
  }

  public get_user_meetings(event=null){
    this.storage.get('ba_auth').then((auth) => {
      if (auth == null) {
        this.router.navigate(['/lander']);
        console.log("user inside");
        console.log(auth);
    }
    this._meeting_provider.get_meetings(auth.access_token).subscribe((data)=>{
      console.log("Meetings")
      this.meetings = data;
      console.log(this.meetings);
      if(event !=null)event.target.complete();
    
    },(error)=>{
      if(event !=null)event.target.complete();
      this.http_error=true;
      console.log(error);
    });
  });
  }

}
