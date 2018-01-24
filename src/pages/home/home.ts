import { Component } from '@angular/core';

import { NavController, AlertController } from 'ionic-angular';

//import {BasicPage} from '../actu/actu';

import { Recherche } from '../recherche/recherche';

import { user } from '../../models/user';

import { AngularFireAuth } from 'angularfire2/auth';

import { data } from '../../providers/data/data';

import { InscriptionPage } from '../inscription/inscription';

import { current } from '../../providers/currentData/currentData';

import { GlobalVar } from '../../providers/GlobalVar/GlobalVar';

import { utilisateur } from '../../models/utilisateur';

import { ProfPage } from '../prof/prof';

import * as firebase from 'firebase/app';

//import { NativeGeocoder, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';






//------------------------------------------

@Component({
  templateUrl: 'home.html'
  // providers:[AngularFireAuth]
})
export class StartPage {
  user = {} as user;
  email: string;
  password: string;
  donnees: data;
  userDonne: any;
  global: GlobalVar;
  test: any;
  uti = {} as utilisateur;
  //,private afAuth:AngularFireAuth
  constructor(public navCtrl: NavController, public Alert: AlertController, private afAuth: AngularFireAuth, public _donnees: data, public userD: current, public _global: GlobalVar) {
    this.afAuth.authState;
    this.test = 0;
    this.uti = {} as utilisateur;
  }

  async openApp(uer: user) {
    try {
      /*this.nativegeocoder.forwardGeocode('2 rue Cavallotti')
      .then((coordinates: NativeGeocoderForwardResult) => {
      console.log('The coordinates are latitude=' + coordinates.latitude + ' and longitude=' + coordinates.longitude)});
*/
      //var test=[];
      //const result = await this.afAuth.auth.createUserWithEmailAndPassword(uer.email,uer.password);
      this.afAuth.auth.signInWithEmailAndPassword(uer.email, uer.password).then(
        this.afAuth.auth.onAuthStateChanged((user) => {
          if (user) {
            //console.log(user.uid);
            this.userD.fill(user.uid);
            this.userDonne = this.userD.data;

            this.userDonne.on("value", async (data) => {
              //console.log(data.val().telephone);
              //console.log(typeof(data));

              //data.forEach(function(value,key) {
              //  var name = {key: value.node_.value_};
              const test = data.val();

              await this._donnees.tonSalut(test);
              console.log(test);
              //console.log(name);
              //});
            });
            var ref = firebase.database().ref("teacher");
            ref.on("value", async data => {

              //console.log(data.val());
              await this._donnees.setD(data.val());

              
              /*for (key in this._donnees.d) {
                // console.log(this._donnees.d[key].prenom);
              }*/
            });
            this._donnees.setId(user.uid);
            this.navCtrl.push(Recherche);
          }
          else {
            console.log("erreur");
          }

        }));
    }
    catch (e) {
      console.error(e);
    }

  }


  inscription() {
    let alert = this.Alert.create();
    alert.setTitle('Vous etes ?');

    alert.addInput({
      type: 'radio',
      label: 'professeur',
      value: 'prof',
      checked: false
    });

    alert.addInput({
      type: 'radio',
      label: 'eleve',
      value: 'eleve',
      checked: true
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        console.log(data);
        console.log(data == "prof");
        if (data == "prof") {
          this.navCtrl.push(ProfPage);
        }
        else {
          this.navCtrl.push(InscriptionPage);
        }
      }
    });
    alert.present();
  }


  save(donne) {
    this._donnees.save(donne);
  }
  logout() {

  }
}