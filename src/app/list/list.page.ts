import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MeetingProvider} from 'src/providers/meeting/meeting';
import {LoadingController, NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import { Storage } from '@ionic/storage'

@Component({
    selector: 'app-list',
    templateUrl: 'list.page.html',
    styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
    public meeting_docs: any;
    private active_meeting_id: any = [];
    private loading;
    meetings: any;
    login_token: any = [];
    http_error: any;

    constructor(
        public activatedRoute: ActivatedRoute,
        public http: HttpClient,
        public navCtrl: NavController,
        private _meeting_provider: MeetingProvider,
        private loadingController: LoadingController,
        public storage: Storage
    ) {

        this.activatedRoute.paramMap.subscribe((params) => {

            this.storage.get('ba_auth').then((auth) => {
                this.login_token = auth;
                this.active_meeting_id = params.get('id');
                this._meeting_provider.get_meeting_docs(this.active_meeting_id, this.login_token.access_token).subscribe((data) => {
                    // this.presentLoading("").dismiss();
                    console.log("Meeting Docs");
                    this.meeting_docs = data;
                    console.log(data);
                }, (error) => {

                    console.log(error);
                });
              });

        })


    }



    ngOnInit() {
    }

}
