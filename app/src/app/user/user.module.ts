import { NgModule, Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule, ActivatedRoute, Router } from '@angular/router';

import { IonicModule, LoadingController } from '@ionic/angular';

import { UserPage } from './user.page';
import { RestApiService } from '../rest-api.service';

const routes: Routes = [
  {
    path: '',
    component: UserPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UserPage]
})
export class UserPageModule implements OnInit {
  private user: any = {};

  constructor(private api: RestApiService,
    private loadingController: LoadingController,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location) {

    }

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

    async delete(id) {
      const loading = await this.loadingController.create({
        message: 'Deleting'
      });
      await loading.present();
      await this.api.deleteUser(id)
        .subscribe(res => {
          loading.dismiss();
          this.location.back();
        }, err => {
          console.log(err);
          loading.dismiss();
        });
    }

}
