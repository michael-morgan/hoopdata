import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LoadingController } from '@ionic/angular';

import { RestApiService } from '../services/rest-api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  private user: any = {};

  constructor(private api: RestApiService,
    private loadingController: LoadingController,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getUser();
  }

  async getUser() {
    const loading = await this.loadingController.create({
      message: 'Loading'
    });
    await loading.present();
    await this.api.getUserById(this.route.snapshot.paramMap.get('id'))
      .subscribe(res => {
        console.log(res);
        this.user = res;
        loading.dismiss();
      }, err => {
        console.log(err);
        loading.dismiss();
      });
  }

}
