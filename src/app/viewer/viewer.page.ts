import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MeetingProvider} from 'src/providers/meeting/meeting';
import {LoadingController, NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {FileTransfer, FileUploadOptions, FileTransferObject} from '@ionic-native/file-transfer/ngx';
import {File} from '@ionic-native/file/ngx';
import {load} from '@angular/core/src/render3';
import { Storage } from '@ionic/storage'

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.page.html',
  styleUrls: ['./viewer.page.scss'],
})
export class ViewerPage implements OnInit {

  private active_document_id:any;
  login_token: any = [];
  constructor(
      public activatedRoute: ActivatedRoute,
      public http: HttpClient,
      public navCtrl: NavController,
      private _meeting_provider: MeetingProvider,
      private loadingController: LoadingController,
      private transfer: FileTransfer,
      private file: File,public storage: Storage
  ) {
    this.get_document()
  }

  get_document() {

    this.activatedRoute.paramMap.subscribe((params) => {
        console.log("Login")
      
        this.storage.get('ba_auth').then((auth) => {
            const httpOptions = {
              headers: new HttpHeaders({
                'Accept':'application/octet-stream',
                'Content-Transfer-Encoding': 'binary',
                'Authorization':'Bearer '+auth.access_token
              })
            };
            this.active_document_id = params.get('id');
            const fileTransfer: FileTransferObject = this.transfer.create();
            const url = 'http://149.28.84.129/document/' + this.active_document_id;
            console.log(url);
            console.log("start download");

            fileTransfer.download(url,this.file.dataDirectory +  this.active_document_id)
            .then((entry) => {
              console.log('download complete: ' + entry.toURL());

              console.log(entry);
                
            },(error) => {
              console.log(error);
            });

      })

    })
      
    }
  
  ngOnInit() {
  }

}
