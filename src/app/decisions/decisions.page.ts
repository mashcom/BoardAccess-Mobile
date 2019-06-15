import { Component, OnInit } from '@angular/core';
import { MeetingProvider } from 'src/providers/meeting/meeting';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage'

@Component({
  selector: 'app-decisions',
  templateUrl: './decisions.page.html',
  styleUrls: ['./decisions.page.scss'],
})
export class DecisionsPage implements OnInit {
  private decisions;
  constructor(private _meeting_provider: MeetingProvider,private router:Router,private storage:Storage) {
    this.get_decisions();
   }

  ngOnInit() {
  }

  get_decisions(){
    this.storage.get('ba_auth').then((auth) => {
      if (auth == null) {
        this.router.navigate(['/lander']);
        console.log("user inside");
        console.log(auth);
    }
    this._meeting_provider.get_decisions_list(auth.access_token).subscribe((data:any)=>{
      console.log(data)
      this.decisions = data;
    },(error)=>{
      console.log(error);
    });

  })
  }

}
