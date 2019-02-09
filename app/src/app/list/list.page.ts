import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../services/rest-api.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  private users: any;

  constructor(private api: RestApiService, private loadingController: LoadingController) {

  }

  ngOnInit() {
    this.getUsers();
  }

  async getUsers() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    await this.api.getUser()
      .subscribe(res => {
        console.log(res);
        this.users = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }
}
