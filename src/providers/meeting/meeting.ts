import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
/*
  Generated class for the MeetingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()

export class MeetingProvider {
  const
  ENDPOINT = "http://149.28.84.129";
  private token;
  constructor(public http: HttpClient,private storage:Storage) {
    console.log('Hello MeetingProvider Provider');
   
  }

  headers(token){
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':'application/json',
        'Authorization':'Bearer '+ token
      })
    };
    return httpOptions;
  }
  login(email,password){
    let headers:any = new HttpHeaders({
      'Content-Type':'multipart/form-data',
      'Accept':'application/json'
    });
    let input_data:any = {
      "grant_type":"password",
      "client_id":2,
      "client_secret":"dfrbx6uDcrV0y1lG1PaRlwdF1xlq2aU2a79As9zt",
      "username":email,
      "password":password,
      "scope":"*"
    }
    return this.http.post(this.ENDPOINT+"/oauth/token",input_data,headers);
  }
  
  get_meetings(token){
    return this.http.get(this.ENDPOINT+"/api/user/meetings/list",this.headers(token));
  }

  get_meeting_docs(id,token){
    return this.http.get<IMeeting>(this.ENDPOINT+"/api/meeting/"+id,this.headers(token));
  }

  get_decisions_list(token){
    
    return this.http.get<IMeeting>(this.ENDPOINT+"/api/user/decisions/list",this.headers(token));
  }

}
export interface IMeeting {
}
