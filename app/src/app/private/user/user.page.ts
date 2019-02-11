import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LoadingController } from '@ionic/angular';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  private user: any = {};

  constructor(private userService: UserService,
    private loadingController: LoadingController,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    // this.getUser();
  }

  // public async getUser() {
  //   const loading = await this.loadingController.create({
  //     message: 'Loading'
  //   });
  //   await loading.present();
  //   await this.userService.getUser()
  //     .subscribe(res => {
  //       this.user = res;
  //       loading.dismiss();
  //     }, err => {
  //       loading.dismiss();
  //     });
  // }

}
