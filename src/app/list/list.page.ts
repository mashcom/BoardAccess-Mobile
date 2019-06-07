import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MeetingProvider } from 'src/providers/meeting/meeting';
import { LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { load } from '@angular/core/src/render3';


@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  public meeting_docs:any=[];
  private active_meeting_id:any=[];
  private loading;

  constructor( 
    public activatedRoute:ActivatedRoute, 
    public http: HttpClient,
    public navCtrl: NavController,
    private _meeting_provider: MeetingProvider,
    private loadingController:LoadingController,
    private transfer: FileTransfer, 
    private file: File
 ) {

      this.activatedRoute.paramMap.subscribe((params)=>{
          //present loading
         
          //  this.presentLoading("Retrieving Documents").present();
          this.active_meeting_id = params.get('id');
          this._meeting_provider.get_meeting_docs(this.active_meeting_id,"").subscribe((data)=>{
           // this.presentLoading("").dismiss();
          console.log("Meeting Docs");
            this.meeting_docs = data;

            console.log(data);
          },(error)=>{
           // this.presentLoading("").dismiss();
            console.log(error);
          });
      })


  }
 
  presentLoading(message):any {
    this.loading = this.loadingController.create({
      message: message
    });
    //await loading.present();
    return this.loading;
  }



  get_document(id){

    return  location.href ="/viewer";
    const fileTransfer: FileTransferObject = this.transfer.create();
    const url = 'http://149.28.84.129/document/'+id;
    console.log(url);
    console.log("start download");
    fileTransfer.download(url, this.file.dataDirectory + id).then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      console.log(error);
    });
  }
  

  ngOnInit() {
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
