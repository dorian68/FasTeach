import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { inscrip  } from '../../models/inscrip';
import { DisponibilitePage } from '../disponibilite/disponibilite';
import { data } from '../../providers/data/data';
import { AngularFireAuth } from 'angularfire2/auth';
  
/**
 * Generated class for the InscriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  templateUrl: 'inscription.html',
})
export class InscriptionPage {
  inscrip={} as inscrip;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  adresse: string;
  telephone: string;
  dtest: any;
  myDate: any;
  _data: data;
  public date: Date = new Date(Date.now());
  constructor(public navCtrl: NavController, public navParams: NavParams,public afAuth: AngularFireAuth,public Alert: AlertController,public data: data) {
    
}
  selectDispo()
  {
    this.navCtrl.push(DisponibilitePage);
  }
  async inscrit(i:inscrip)
  { 
    try{
      await this.afAuth.auth.createUserWithEmailAndPassword(i.email,i.password);
     
      this.afAuth.auth.onAuthStateChanged((user) => {
        if (user) {
          console.log(user.uid);
          i.id="eleve";
          this.data.addUserData(user.uid,i);
        }
      })

      
      /*
      this.dtest=this.data.get('bn');
      await this.data.save(i);*/
      let alert = this.Alert.create({
      title: 'Félicitation '+ i.prenom +' !',
      subTitle: 'Vous etes aujourdhui un Fast Learner!',
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
