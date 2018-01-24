import { Component } from '@angular/core';
import { NavController, NavParams, AlertController,ActionSheetController } from 'ionic-angular';
 //import { DisponibilitePage } from '../disponibilite/disponibilite';
import { data } from '../../providers/data/data';
import { AngularFireAuth } from 'angularfire2/auth';
import { professeur } from '../../models/professeur';
//import * as firebase from 'firebase/app';
//import { trigger, state, style, transition, animate } from '@angular/animations';


/**
 * Generated class for the ProfPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

 
@Component({
  templateUrl: 'prof.html'
})

export class ProfPage {
  professeur={} as professeur;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  adresse: string;
  telephone: string;
  dtest: any;
  myDate: any;
  _data: data;
  public dipo: any[] = [];
  public date: Date = new Date(Date.now());

  constructor(public navCtrl: NavController, public navParams: NavParams,public afAuth: AngularFireAuth,public Alert: AlertController,public actionSheetCtrl: ActionSheetController,public data: data) {
   
      for(var heur=8;heur<18;heur++){
      for(var minI=0;minI<1;minI++){
        if(minI==0)
        {
          this.dipo.push({
            heure: heur+':'+"00"})
        }
        else{
          this.dipo.push({
            heure: heur+':'+minI*30})
        }
      }
    }
    console.log(this.dipo);
}

/*
presentActionSheet() {
  let actionSheet = this.actionSheetCtrl.create({
    title: 'Modify your album',
    buttons: [
      {
        text: 'Destructive',
        role: 'destructive',
        handler: () => {
          console.log('Destructive clicked');
        }
      },
      {
        text: 'Archive',
        handler: () => {
          console.log('Archive clicked');
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
    ]
  });

  actionSheet.present();
}*/

  selectDispo()
  {
    //this.navCtrl.push(DisponibilitePage);
    //this.presentActionSheet();
    console.log("azerty");
    console.log(this.dipo);
    
  }
  async inscrit(i:professeur)
  {
    try{
      await this.afAuth.auth.createUserWithEmailAndPassword(i.email,i.password);
     
      this.afAuth.auth.onAuthStateChanged((user) => {
        if (user) {
          console.log(user.uid);
          //this.data.addUserData(user.uid,i);
          i.id="prof";
          this.data.addProf(user.uid,i);
          this.data.addUserData(user.uid,i);
        }
      })

      
      /*
      this.dtest=this.data.get('bn');
      await this.data.save(i);*/
      let alert = this.Alert.create({
      title: 'Félicitation '+ i.prenom +' !',
      subTitle: 'Vous etes aujourdhui un Fast Teacher!',
      buttons: ['OK']
      
      
    });
    this.navCtrl.pop();
    alert.present();
    
      console.log(i);
      console.log(this.dtest);
    }
    catch(e){
      console.error(e);
      
    }
  }


}
