import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
  Generated class for the MeetingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()

export class MeetingProvider {
  const
  ENDPOINT = "http://149.28.84.129";

  constructor(public http: HttpClient) {
    console.log('Hello MeetingProvider Provider');
  }


  login(){
    let headers:any = new HttpHeaders({
      'Content-Type':'multipart/form-data',
      'Accept':'application/json'
    });
    let input_data:any = {
      "grant_type":"password",
      "client_id":2,
      "client_secret":"dfrbx6uDcrV0y1lG1PaRlwdF1xlq2aU2a79As9zt",
      "username":"bmashcom@hotmail.com",
      "password":"studios",
      "scope":"*"
    }
    return this.http.post(this.ENDPOINT+"/oauth/token",input_data,headers);
  }
  get_meetings(token){
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':'application/json',
        'Authorization':'Bearer '+token
      })
    };
    
  
    return this.http.get(this.ENDPOINT+"/api/committee",httpOptions);
  }

  get_meeting_docs(id,token){
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept':'application/json',
        'Authorization':'Bearer '+token
      })
    };
    return this.http.get<IMeeting>(this.ENDPOINT+"/api/meeting/"+id,httpOptions);
  }

}
export interface IMeeting {
}
