import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
//import {User} from 'firebase/app';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
 

@Injectable()
export class data {
  private _db: any;
  private auth: any;
  public current: any;
  public utilisateur: any;
  // D stand for information about teacher
  public d: any;
  public currentRoom: any;
  public selectedTeacher: any;
  public eleveNote: any;
  public recherche: any;
  public HasSearchED: any;
  
  constructor(/*public af: AngularFireDatabase*/) {
    this._db=firebase.database().ref('/');
    this.auth=firebase.auth();
    this.HasSearchED=false;
    //this.d=this.af.list('/');
  }

   setD(donnee){
    this.d=donnee;
   }
  addProf(key,donnee)
  {
    firebase.database().ref('teacher/'+key).set(donnee);
  }
  addUserData(key,donnee)
  {
    //firebase.database().ref('user').push(donnee);
    firebase.database().ref('user/'+key).set(donnee);
  }
  save(donnee)
  {
    return this._db.push(donnee).key;
  }
  get(adresse)
  {
    return firebase.database().ref(adresse);
  }
  base()
  {
    return firebase;
  }
  logOut()
  {
    this.auth.signOut();
  }
  setId(value) {
    this.current = value;
  }
  tonSalut(value) {
    //this.d=this.af.database.list('/').query();
    //return this.d;
    this.utilisateur=value;
  }
  salut()
  {
    return this.utilisateur;
  }
  getMyGlobalVar() {
    //return this.current;
    var ref=firebase.database().ref('user/'+this.current);
    ref.on("value",data => {
      //console.log(data.val());
      return data.val();
    });

}
}
