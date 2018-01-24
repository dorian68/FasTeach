import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
//import { Button } from 'ionic-angular/components/button/button';
import { data } from '../../providers/data/data';
import * as firebase from 'firebase/app';
 //import { EmbeddedTemplateAst } from '@angular/compiler';

/**
 * Generated class for the DisponibilitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  templateUrl: 'disponibilite.html'
})
export class DisponibilitePage {
  edt: any[] = [];
  hor: any[] = [];
  referenceSalle: any;
  idCurrentUser: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public Alert: AlertController,public _data: data) {
    this.referenceSalle= firebase.database().ref("teacher/"+this._data.selectedTeacher+"/rdv"); 
    this.idCurrentUser= firebase.database().ref("user/"+this._data.current+"/rdv");
    var test = new Date();  
  for(var heur=8;heur<18;heur++){
      for(var minI=0;minI<1;minI++){
        if(minI==0)
        {
          this.hor.push({
            heure: heur+':'+"00"})
        }
        else{
          this.hor.push({
            heure: heur+':'+minI*30})
        }
      }
    }
    
    this.edt=[

    ];
    var jour=test.getDay();
    var date=test.getDate();
    //var mois=test.getMonth();
    
    //-----------------------------------
    this.edt.push({
      jour: this.toDay(jour)+' '+test.getDate(),
      horaires: this.hor,
      date: test.getMonth()+1+"/"+test.getDate()+"/"+test.getFullYear()
    })

    date=test.getDate();
    jour=test.getDay();
    test.setDate(test.getDate()+1);
    
    //-----------------------------------
    this.edt.push({
      jour: this.toDay(jour)+' '+test.getDate(),
      horaires: this.hor,
      date: test.getMonth()+1+"/"+test.getDate()+"/"+test.getFullYear()
    })

    date=test.getDate();
    jour=test.getDay();
    test.setDate(test.getDate()+1);
    

    //-----------------------------------    
    this.edt.push({
      jour: this.toDay(jour)+' '+test.getDate(),
      horaires: this.hor,
      date: test.getMonth()+1+"/"+test.getDate()+"/"+test.getFullYear()
    })
    
    date=test.getDate();
    jour=test.getDay();
    test.setDate(test.getDate()+1);
    
    //-----------------------------------

    this.edt.push({
      jour: this.toDay(jour)+' '+test.getDate(),
      horaires: this.hor,
      date: test.getMonth()+1+"/"+test.getDate()+"/"+test.getFullYear()
    })
    date=test.getDate();
    jour=test.getDay();
    test.setDate(test.getDate()+1);
    
    //-----------------------------------

    this.edt.push({
      jour: this.toDay(jour)+' '+test.getDate(),
      horaires: this.hor,
      date: test.getMonth()+1+"/"+test.getDate()+"/"+test.getFullYear()
    })

  }
  touche(){/*
    var a=[];
    this.edt.forEach(el => {
      a=el.horaires;
      a.forEach(element => {
        console.log(element.heure);
      });
      console.log(a)
    });
    console.log(this.edt[1].horaires);*/
    };
    
  change(){
    this.edt.push({
      jour: 'dimanche',
      horaires: this.hor 
    })
    console.log('touche');
  }

  isPresent(date,label){
    const d = new Date(date);
    var tp;
    var dat;
    var t;
    var cle;
    var key;
    var u = label;
    var result = false;
      this.referenceSalle= firebase.database().ref("teacher/"+this._data.selectedTeacher+"/rdv"); 
    this.referenceSalle.on("value", async data => {
      
      /*var x = new Promise((resolve,reject) => {
      
      resolve(result)
      reject(console.log("valeur pas atteinte"))
    })*/
    t = data.val();
    });
    console.log(t);
    cle = Object.keys(t)
    
    
    for(key in cle) {
      
      tp = t[cle[key]].cours;
      
      dat = new Date(tp.date);
      
      if((dat.getDate()==d.getDate())&&(dat.getMonth()==d.getMonth())) {
        var b =  tp.creneau.split(" ",3)[2];
        console.log(b)
        if(b == u) {
          console.log("oui");
          result = true;
          return true;
        }
      }
    };     
    
  }

  toDay(day){
    switch(day){
      case 0:
        return "dim";
    case 1:
        return "lun";
    case 2:
        return "mar";
    case 3:
        return "mer";
    case 4:
        return "jeu";
    case 5:
        return "ven";
    case 6:
       return "sam";
    }
  }

  toDayReverse(day){
    switch(day){
    case 0:
        return "dim";
    case 1:
        return "lun";
    case 2:
        return "mar";
    case 3:
        return "mer";
    case 4:
        return "jeu";
    case 5:
        return "ven";
    case 6:
       return "sam";
    }
  }

  print1(label){   
    //console.log(label+': '+this.edt[0].jour);
    //console.log(this._data.selectedTeacher);
    
    var b = this.isPresent(this.edt[0].date,label);
    console.log(b);

      if(b) {
        let alert = this.Alert.create({
          title: 'occupé!',
          subTitle: 'désolé, ce créneau est déjà pris',
          buttons: ['cancel','OK']
          });
          alert.present();
      }
      else {
        let alert = this.Alert.create({
          title: 'Est-tu sur !',
          subTitle: this._data.utilisateur.nom + ' confirme tu  un rendez-vous le '+this.edt[0].jour+' avec '+ this._data.d[this._data.selectedTeacher].prenom +' '+ this._data.d[this._data.selectedTeacher].nom+' ?',
          buttons: ['cancel','OK']
          });
          alert.present();

      this.referenceSalle.push({cours: {eleve: this._data.utilisateur.prenom+ " "+this._data.utilisateur.nom,creneau: this.edt[0].jour+': '+label,adresseEleve: this._data.utilisateur.adresse,date: this.edt[0].date}});
      this.idCurrentUser.push({cours: {professeur: this._data.d[this._data.selectedTeacher].prenom+" "+this._data.d[this._data.selectedTeacher].nom,creneau: this.edt[0].jour+': '+label,adresseProf: this._data.d[this._data.selectedTeacher].adresse,date: this.edt[0].date}});
      }
      //var zer = firebase.database().ref("user/"+this._data.current);
      
      
      // si ce c'est pas encore un élève on l'ajoute en tant qu'élève de ce prof
      var tempo = firebase.database().ref("teacher/"+this._data.selectedTeacher+"/eleve");

      tempo.on("value", data => {
        if(data.val()==null){
          var z = firebase.database().ref("user/"+this._data.current);
              z.on("value", da => {
                var e = firebase.database().ref("teacher/"+this._data.selectedTeacher+"/eleve/"+this._data.current);
                e.set(da.val());
              });
              console.log("est null")
        }
        else{
          var key;
          for(key in data.val()){
            //console.log(key);
  
            var varZ = firebase.database().ref("user/"+this._data.current);
            varZ.on("value", da => {
              //console.log(da.val());
              if(data.val()[key].email==da.val().email){
                console.log((data.val()[key].email==da.val().email));
              }
              else{
                var e = firebase.database().ref("teacher/"+this._data.selectedTeacher+"/eleve/"+this._data.current);
                e.set(da.val());
              }
  
            });
            
          }
        }


      });
  }
  async print2(label){

    var b = await this.isPresent(this.edt[1].date,label);
    await console.log(b);
    
    if(b) {
      let alert = this.Alert.create({
        title: 'occupé!',
        subTitle: 'désolé, ce créneau est déjà pris',
        buttons: ['cancel','OK']
        });
        alert.present();
    }
    else {
      let alert = this.Alert.create({
        title: 'Est-tu sur !',
        subTitle: this._data.utilisateur.nom + ' confirme tu  un rendez-vous le '+this.edt[1].jour+' avec '+ this._data.d[this._data.selectedTeacher].prenom +' '+ this._data.d[this._data.selectedTeacher].nom+' ?',
        buttons: ['annuler','OK']
        });
        alert.present();
        this.referenceSalle.push({cours: {eleve: this._data.utilisateur.prenom+ " "+this._data.utilisateur.nom,creneau: this.edt[1].jour+': '+label,adresseEleve: this._data.utilisateur.adresse,date: this.edt[1].date}});
        this.idCurrentUser.push({cours: {professeur: this._data.d[this._data.selectedTeacher].prenom+" "+this._data.d[this._data.selectedTeacher].nom,creneau: this.edt[1].jour+': '+label,adresseProf: this._data.d[this._data.selectedTeacher].adresse,date: this.edt[1].date}});
   }



    console.log(label+': '+this.edt[1].jour);
  }
  async print3(label){

    var b = await this.isPresent(this.edt[2].date,label);
    await console.log(b);

    if(b) {
      let alert = this.Alert.create({
        title: 'occupé!',
        subTitle: 'désolé, ce créneau est déjà pris',
        buttons: ['cancel','OK']
        });
        alert.present();
    }
    else {
      let alert = this.Alert.create({
        title: 'Est-tu sur !',
        subTitle: this._data.utilisateur.nom + ' confirme tu  un rendez-vous le '+this.edt[2].jour+' avec '+ this._data.d[this._data.selectedTeacher].prenom +' '+ this._data.d[this._data.selectedTeacher].nom+' ?',
        buttons: ['cancel','OK']
        });
        alert.present();
        this.referenceSalle.push({cours: {eleve: this._data.utilisateur.prenom+ " "+this._data.utilisateur.nom,creneau: this.edt[2].jour+': '+label,adresseEleve: this._data.utilisateur.adresse,date: this.edt[2].date}});
        this.idCurrentUser.push({cours: {professeur: this._data.d[this._data.selectedTeacher].prenom+" "+this._data.d[this._data.selectedTeacher].nom,creneau: this.edt[2].jour+': '+label,adresseProf: this._data.d[this._data.selectedTeacher].adresse,date: this.edt[2].date}});
   }
     console.log(label+': '+this.edt[2].jour);
  }



  async print4(label){

    var b = await this.isPresent(this.edt[3].date,label);
    await console.log(b);
    
    if(this.isPresent(this.edt[3].date,label)) {
      let alert = this.Alert.create({
        title: 'occupé!',
        subTitle: 'désolé, ce créneau est déjà pris',
        buttons: ['cancel','OK']
        });
        alert.present();
    }
    else {
      let alert = this.Alert.create({
        title: 'Est-tu sur !',
        subTitle: this._data.utilisateur.nom + ' confirme tu  un rendez-vous le '+this.edt[3].jour+' avec '+ this._data.d[this._data.selectedTeacher].prenom +' '+ this._data.d[this._data.selectedTeacher].nom+' ?',
        buttons: ['cancel','OK']
        });
        alert.present();
        this.referenceSalle.push({cours:{eleve: this._data.utilisateur.prenom+ " "+this._data.utilisateur.nom,creneau: this.edt[3].jour+': '+label,adresseEleve: this._data.utilisateur.adresse,date: this.edt[3].date}});
        this.idCurrentUser.push({cours: {professeur: this._data.d[this._data.selectedTeacher].prenom+" "+this._data.d[this._data.selectedTeacher].nom,creneau: this.edt[3].jour+': '+label,adresseProf: this._data.d[this._data.selectedTeacher].adresse,date: this.edt[3].date}});
   }

     console.log(label+': '+this.edt[3].jour);
  }

  async print5(label){

    var b = await this.isPresent(this.edt[4].date,label);
    await console.log(b);

    if(this.isPresent(this.edt[4].date,label)) {
      let alert = this.Alert.create({
        title: 'occupé!',
        subTitle: 'désolé, ce créneau est déjà pris',
        buttons: ['cancel','OK']
        });
        alert.present();
    }
    else {
      let alert = this.Alert.create({
        title: 'Est-tu sur !',
        subTitle: this._data.utilisateur.nom + ' confirme tu  un rendez-vous le '+this.edt[4].jour+' avec '+ this._data.d[this._data.selectedTeacher].prenom +' '+ this._data.d[this._data.selectedTeacher].nom+' ?',
        buttons: ['cancel','OK']
        });
        alert.present();
        this.referenceSalle.push({cours: {eleve: this._data.utilisateur.prenom+ " "+this._data.utilisateur.nom,creneau: this.edt[4].jour+': '+label,adresseEleve: this._data.utilisateur.adresse,date: this.edt[4].date}});
        this.idCurrentUser.push({cours: {professeur: this._data.d[this._data.selectedTeacher].prenom+" "+this._data.d[this._data.selectedTeacher].nom,creneau: this.edt[4].jour+': '+label,adresseProf: this._data.d[this._data.selectedTeacher].adresse,date: this.edt[4].date}});
  }
     console.log(label+': '+this.edt[4].jour);
  }
  }