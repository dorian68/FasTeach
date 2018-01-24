import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { data } from '../../providers/data/data';
import { Recherche } from '../recherche/recherche';
import { selection } from '../../models/selection';
/* Import Mobiscroll from the package */
import { mobiscroll } from '@mobiscroll/angular-trial';
import *  as firebase from 'firebase/app';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';


/**
 * Generated class for the SelectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

mobiscroll.settings = {
  lang: 'fr',
  theme: 'material'
};

@Component({
  templateUrl: 'selection.html',
})
export class SelectionPage {
    public selection: any;
    public select={} as selection;
    public matiere: any;
    public demo: Date;
    public header: Date;
    public nonForm: Date;
    public finalSelect: any;
    demoSettings: any = {
        theme: 'material',
        lang: 'fr',
        display: 'center'
    };
    headerSettings: any = {
        theme: 'material',
        lang: 'fr',
        display: 'center',
        headerText: '{value}'
    };
    nonFormSettings: any = {
        theme: 'material',
        lang: 'fr',
        display: 'center'
    };

  constructor(public navCtrl: NavController,public Alert: AlertController ,public navParams: NavParams,public _data: data) {
    this.selection = [];
    this.finalSelect = [];
  }
  
  cov(valeur)
  {
    //var a = valeur.replace()
    return Date;
  }
  onChange($event) {
    console.log($event);
  }
  recherche(i: selection){
    const prof = firebase.database().ref('teacher');
    var key;
    
    prof.on("value", async data => {
      for(key in data.val()) {
        const matiere = this._data.d[key].matiere;

        if( i.matiere == matiere ) {
          this.selection.push(key);
         }
      }

      //si l'utilisateur a entré une matière
      try{

        //on teste si la recherche a été aboutie
        if(this.selection.length==0) {
          this._data.HasSearchED=true;
  
          //alert("Malheureusement il n'y a pas de prof disponible");
          let a = this.Alert.create({title: "Recherche non aboutie",
                        message: "Malheureusement il n'y a pas de prof disponible",
                        buttons: ['ok']});
            a.present();
        }
        else {
          var dispo = [];
          var confirme = [];
          this._data.recherche = await this.selection;


          this.selection.forEach(element => {

            var temporaire = element;
            console.log(element)
            var dt;
            var d;
            
            //on regarde les rdv des profs
            const rdv = firebase.database().ref("teacher/"+temporaire+"/rdv");
            rdv.on("value" , async data => {

              var tab = data.val();
              //console.log(tab);

              if((tab==null)||(tab==undefined)) {
                console.log("prof dispo");
                await confirme.push(temporaire);
              }
              else {
              var cle =Object.keys(tab);

              //pour chaque rdv du prof on verifie ses disponibilitées pour le jour demandé
              cle.forEach(async key => {
                dt = await tab[key].cours.date;
                d = new Date(dt);

                //console.log(d);
                //console.log(this.nonForm);
                 if((d.getDate()==this.nonForm.getDate())&&(d.getMonth())==this.nonForm.getMonth())
                {
                  console.log("touche");
                  dispo.push(key);
                  console.log(dispo);
                }          
              });
              
              //console.log(temporaire);
              await console.log(dispo);
                  new Promise((resolve,reject)=> {
                  resolve(dispo);
                  reject(console.log("error"))
                })
                .then( da => { console.log(da)})

              if(dispo.length>=9) {
                console.log("indisponible");
              }
              else {
                console.log(dispo);
                //dc = dispo;
                //console.log(dc);
                console.log("il est disponible");
                await confirme.push(temporaire);
              }
              
              }
              dispo = [];
            });
            
            

          });
          await console.log(dispo.length);
          await console.log(dispo);
          await console.log(confirme);


          //this._data.recherche = this.finalSelect;
          this._data.HasSearchED = true;
          this.finalSelect = confirme;
          this._data.recherche = confirme;
          console.log(this.finalSelect);
        }
       }
      
      catch(e) {
        let a = this.Alert.create({title: "Recherche non aboutie",
                        message: "Malheureusement il n'y a pas de prof disponible",
                        buttons: ['ok']});
            a.present();
            console.log(e.error);     
      }
       
    });
    this.navCtrl.pop();
    this.navCtrl.push(Recherche);

  }
  
  
}
