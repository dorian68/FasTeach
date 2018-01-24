
import { Component } from '@angular/core';

import { NavController ,AlertController , NavParams ,Platform} from 'ionic-angular';

import { BasicPage } from '../actu/actu';

import { Perso } from '../perso/perso';

import { data } from '../../providers/data/data';
import * as firebase from 'firebase/app';
import { GoogleMap, GoogleMapsEvent } from '@ionic-native/google-maps';
 
import { NativeGeocoder, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { GoogleMapOptions,GoogleMaps } from '@ionic-native/google-maps';
import { SelectionPage } from '../selection/selection';
//import { FeedBackPage } from '../feed-back/feed-back';
import { VosProfsPage } from '../vos-profs/vos-profs';
import { ProfFeedBackPage } from '../prof-feed-back/prof-feed-back';
  




@Component({
    templateUrl: 'recherche.html'
})

export class Recherche{
    async ionViewDidLoad() {
        const userRef = this._data.get('/'+this._data.current+'/');
        userRef.on("value",data => {
        this.userName=data;
        //console.log("votre nom est "+" votre identifiant :"+this._data.current);
        //console.log(this.userName);
        //this.tf.push()
        //this.nom=c;
        this.loadMap();
    });
    }
    public nom: any;
  public userName={};  
  public data: data;
  public tf:any[]=[];
  public listRdv:any[]=[];
  public dataRoom: any[]=[];
  public tmp: any;
  public t: any;
  public map: GoogleMap ;
  
    constructor(public navCtrl: NavController,public Alert: AlertController,private nativegeocoder: NativeGeocoder,public googleMaps: GoogleMaps, public _data:data,public platform: Platform) {
    this.dataRoom=this._data.d;
    this.tmp=[];
    const userRef2 = firebase.database().ref('user/'+this._data.current+'/rdv');
    //console.log(this._data.utilisateur.adresse);
    //console.log(this._data.recherche);


    //this._data=new data;
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

    if(this._data.HasSearchED){
      this.tmp = this._data.recherche;
    }
    else{
      this.tmp = Object.keys(this._data.d);
    }

    
    //console.log(this.tmp);

    var key: any;
    for(key in this._data.d)
    {
      
      //this._data.d[key].push({cle: key});
      //console.log(typeof(this._data.d[key]));
      this.tf.push(this._data.d[key]);
      //console.log(typeof(this.tf));

    };

 this.listRdv=[];
//console.log(this.listRdv.length)

    userRef2.on("value", data => {
        var key;
        for( key in data.val() )
        {
            //var tmp = data[key].val();
            //console.log(data.val()[key].creneau);
            this.listRdv.push(data.val()[key].cours);
        }
    });
    //console.log(this.listRdv);
    this.map = new GoogleMap('map');

    platform.ready().then(() => {
      this.loadMap();
  });

  }
  
  openRoom(idProf: string){
      //console.log("touché!");
      //console.log(this.dataRoom);
      //console.log(this._data.d)
      this._data.currentRoom=idProf;
      //console.log(this._data.currentRoom);
      //console.log(teacher);
      this.navCtrl.push(BasicPage); 

      //reference à la table des profs
      //var ref = firebase.database().ref("teacher");
      /*ref.on("value", data => {
        var key: any;
        for(key in data.val()) {
            console.log(data.val());
            console.log(key);
            console.log(data.val()[key]);
        }
      });*/

  }
  search(){
    //console.log("select?");
    this.navCtrl.push(SelectionPage);
}
  personalPage(item: any){
      this._data.selectedTeacher=item;
      this.navCtrl.push(Perso);
  }
  logout(){
      this._data.logOut();
      //console.log("touché!");
  }
  feedBack(){
      /*if(this._data.){

      }*/
      //console.log(this._data.utilisateur);
      if(this._data.utilisateur.id="prof")
      {
         
        //console.log(this._data.current);
        this.navCtrl.push(ProfFeedBackPage);
      }
      else{
        this.navCtrl.push(VosProfsPage);
      }
  }
  

  
  loadMap(){
    try{
      //let location = new Marker(-34.9290,138.6010);

      let mapOptions: GoogleMapOptions;
//_______________________________________________________________
/*this.nativegeocoder.reverseGeocode(52.5072095, 13.1452818)
.then((result: NativeGeocoderReverseResult) => console.log(JSON.stringify(result)))
.catch((error: any) => console.log(error));*/

this.nativegeocoder.forwardGeocode(this._data.utilisateur.adresse)
.then(async (coordinates: NativeGeocoderForwardResult) => {
 
    //console.log('The coordinates are latitude=' +  coordinates.latitude + ' and longitude=' + coordinates.longitude )
    //console.log(this._data.utilisateur.adresse);

    mapOptions = await {
        camera: {
          target: {
            lat: coordinates.latitude,
            lng: coordinates.longitude
          },
          zoom: 15,
          tilt: 30
        }
      }

      

      
this.map = await GoogleMaps.create('map', mapOptions);

this.map.on(GoogleMapsEvent.MAP_READY)
      .subscribe(() => {
        //console.log('Map is ready!');
        var a= mapOptions.camera.target.lat;
        var b = mapOptions.camera.target.lng;

        var az = this._data.recherche;

        //--------------------------------------

        const professeur = firebase.database().ref('teacher');
        professeur.on("value", data => { 
        az = data.val();
        });

        az.forEach(async data => {
          var key;
          var compte=0
          for(key in data.val())
          {
            compte=compte+1;
            var prof = this._data.d[key];

                const nom = prof.nom;
                const prenom = prof.prenom;
                const adresse = prof.adresse;
                const matiere = prof.matiere;
                const telephone = prof.telephone;
  
                console.log( prof);
              this.nativegeocoder.forwardGeocode(prof.adresse)
              .then( (coordinates: NativeGeocoderForwardResult) => {
                console.log('The coordinates are latitude=' +  coordinates.latitude + ' and longitude=' + coordinates.longitude );
                
                var az = coordinates.latitude;
                var aq = coordinates.longitude;

                //console.log(Number(az));
                //console.log(Number(aq));
                //console.log(prof)
                this.map.addMarker({
                  title: prenom+' '+nom,
                  icon: 'red',
                  animation: 'DROP',
                  position: {
                   lat: Number(az) ,
                   lng: Number(aq)
                  }
                })
                .then(marker => {
                  marker.on(GoogleMapsEvent.MARKER_CLICK)
                    .subscribe(() => {
                      let a = this.Alert.create({title: prenom+' '+nom+' ( '+matiere+' )',
                      subTitle: adresse+'\n'+telephone,
                      message: "test ",
                      buttons: ['ok']});

                      a.present();

                      /*alert({title: prenom+' '+nom+' ( '+matiere+' )',
                      subTitle: adresse+'/n'+telephone,
                      buttons: ['ok']});*/
                    });
                });
  
                
  
          })
          
          }
      })

        //--------------------------------------
        this.map.addMarker({
            title: 'Ionic',
            icon: 'red',
            animation: 'DROP',
            position: {
             lat: a,
             lng: b
            }
          })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                 alert(this._data.utilisateur.prenom+' '+this._data.utilisateur.nom);
              });
          });
      });
})
        
.catch((error: any) => console.log(error));
//_____________________________________________________________


    }
    catch(e)
    {
      console.log(e.error);
    }
    

}
}




export class NavigationDetailsPage {
  item;
  tf;
  nomSalle;
   checklists
  constructor(params: NavParams) {
    this.item = params.data.item;

  }
}