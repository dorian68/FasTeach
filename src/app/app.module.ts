import { FormsModule } from '@angular/forms';
import { MbscModule, mobiscroll } from '@mobiscroll/angular-trial';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import {StartPage} from '../pages/home/home';

import {InscriptionPage} from '../pages/inscription/inscription';

import {BasicPage} from '../pages/actu/actu';

import {Recherche} from '../pages/recherche/recherche';

import {Perso} from '../pages/perso/perso';

import {DisponibilitePage} from '../pages/disponibilite/disponibilite';

import {ProfPage} from '../pages/prof/prof';

import {FeedBackPage} from '../pages/feed-back/feed-back';

import {AngularFireAuthModule} from 'angularfire2/auth';

import { AngularFireModule } from "angularfire2";

import { AngularFireDatabaseModule } from 'angularfire2/database';

import { data } from '../providers/data/data';

import { current } from '../providers/currentData/currentData';

import { NativeGeocoder } from '@ionic-native/native-geocoder';

 //import { CalendarModule } from 'ionic3-calendar';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GlobalVar } from '../providers/GlobalVar/GlobalVar';
import { SelectionPage } from '../pages/selection/selection';
import { VosProfsPage } from '../pages/vos-profs/vos-profs';
import { ProfFeedBackPage } from '../pages/prof-feed-back/prof-feed-back';
import { GoogleMaps } from '@ionic-native/google-maps';
import { CalendarModule } from "ion2-calendar";


const firebaseConfig = {
    apiKey: "AIzaSyDpFu0j1zrFcRuPD4AkwbiGBQAh11yU-80",
    authDomain: "prof-21.firebaseapp.com",
    databaseURL: "https://prof-21.firebaseio.com",
    projectId: "prof-21",
    storageBucket: "prof-21.appspot.com",
    messagingSenderId: "426649794133"
  };
//firebase.initializeApp(firebaseConfig);


mobiscroll.apiKey = 'b6bb0431';

@NgModule({
  declarations: [
    MyApp,
    BasicPage,
    StartPage,
    Recherche,
    Perso,
    InscriptionPage,
    DisponibilitePage,
    ProfPage,
    SelectionPage,
    FeedBackPage,
    VosProfsPage,
    ProfFeedBackPage
  ],
  imports: [ 
    FormsModule, 
    MbscModule,
    BrowserModule,
 //  AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig),
    IonicModule.forRoot(MyApp),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    CalendarModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
   BasicPage,
    StartPage,
    Recherche,
    Perso,
    InscriptionPage,
    DisponibilitePage,
    ProfPage,
    SelectionPage,
    FeedBackPage,
    VosProfsPage,
    ProfFeedBackPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    [data],
    [current],
    [GlobalVar],
    NativeGeocoder,
    GoogleMaps 
  ]
})
export class AppModule {}
