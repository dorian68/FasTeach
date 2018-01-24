import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FeedBackPage } from '../feed-back/feed-back';

/**
 * Generated class for the VosProfsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  templateUrl: 'vos-profs.html',
})
export class VosProfsPage {
  public tmp: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.tmp=[];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VosProfsPage');
  }
  openFeed() {
    this.navCtrl.push(FeedBackPage);
  }

}
