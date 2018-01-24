import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth'

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
 

@Injectable()

export class current {
  public data: any;

  constructor(public afAuth: AngularFireAuth) {
    
    /*this.afAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        this.data=firebase.database().ref('user/'+user.uid);
      }
      else{
        console.log("no user registered");
      }
    })*/
    this.data=[];
  }
  fill(userID)
  {
    this.data=firebase.database().ref('user/'+userID);
    firebase.database().ref('user/'+userID);
  }

}
