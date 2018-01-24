
import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { DisponibilitePage } from '../disponibilite/disponibilite';
import { data } from '../../providers/data/data';



@Component({
    templateUrl: 'perso.html'
})

export class Perso{
    constructor(public navCtrl: NavController,public _data: data){

        
    }
    openReservation(){
      this.navCtrl.push(DisponibilitePage);
    }
}

export class NavigationDetailsPage {
  item;
  constructor(params: NavParams) {
    this.item = params.data.item;
  }


}
