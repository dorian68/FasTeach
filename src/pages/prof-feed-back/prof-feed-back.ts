import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { data } from '../../providers/data/data';
import * as firebase from 'firebase/app';
import { FeedBackPage } from '../feed-back/feed-back';

/**
 * Generated class for the ProfFeedBackPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  templateUrl: 'prof-feed-back.html',
})
export class ProfFeedBackPage {
  public tmp: any;
  public tf: any;
  public cle: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public _data: data) {
    this.tmp=[];
    var tp= firebase.database().ref("teacher/"+this._data.current+"/eleve");
    tp.on("value", data => {
      var a = data.val();
      var key;
      this.cle =Object.keys(a);
      console.log(this.cle);
      console.log(a);
      for(key in a){
        this.tmp.push(a[key]);
        console.log(a[key]);
      }
      console.log(this.tmp);
    });
    this.tf = [
      {
          nom:'Doe',
          prenom:'John',
          adresse:'la Defense',
          matiere:'mathématique'
      },
      {
          nom:'Dacalor',
          prenom:'Axel',
          adresse:'asile psychatrique',
          matiere:'maladie mentale'
      },
      {
          nom:'denon',
          prenom:'Raydge',
          adresse:'a foullole',
          matiere:'enflage de cheville'
      }
      ];

  }

  noterEleve(item: any){
    this._data.eleveNote=item;
     this.navCtrl.push(FeedBackPage); 
  }

}
