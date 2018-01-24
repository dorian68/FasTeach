
import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { data } from '../../providers/data/data';
import * as firebase from 'firebase/app';
import { publication } from '../../models/publication';

@Component({
  templateUrl: 'actu.html',
})

export class BasicPage{
  from: string;
  description: string;
  publi={} as publication;
  td: any[] = [];
  tf: any[] = [];
  name: string;
  referenceSalle:any;
  public tit: string;
  constructor(public navCtrl: NavController,public cur: data){
    this.referenceSalle= firebase.database().ref("teacher/"+this.cur.currentRoom+"/salle/publication"); 

    this.referenceSalle.on("value", data => {
       var key: any;
      for(key in data.val()){
        console.log(data.val()[key]);
        this.tf.push((data.val()[key]));
      } 

      
      
    });
     this.td=[
      {
        items:[
            {description:"salut"}
        ],
        value:[
          {description:"salut"}
        ]
    }
     ];
     /*
    this.tf=[
    {
        title: 'Checklist 1',
        items: [
            {title: 'Task 1', checked: false},
            {title: 'Task 2', checked: false},
            {title: 'Task 3', checked: false}
        ]
    },
    {
        title: 'Check',
        items: [
            {title: 'Task 1', checked: false},
            {title: 'Task 2', checked: false},
            {title: 'Task 3', checked: false}
        ]
    },
    {
        title: 'Checklist 1',
        items: [
            {title: 'Task 1', checked: false},
            {title: 'Task 2', checked: false},
            {title: 'Task 3', checked: false}
        ]
    }
];*/

  //this.name=_home.user.email;
  //console.log(this.name);
  }


  addItem (tit: publication) {
        tit.nbAime=0;
        tit.dateDuComment=Date.now();
        tit.from=this.cur.utilisateur.nom;
        this.tf.push(
             tit        
        )

        firebase.database().ref("teacher/"+this.cur.currentRoom+"/salle/publication").push(tit);
        console.log(tit);
        console.log(this.tf);
        //console.log(this.tf[1].items[1].title)
        // Add values from form to object
        /*newItem.
        newItem.description = form.description.$modelValue;
        newItem.useAsDefault = form.useAsDefault.$modelValue;
        // If this is the first item it will be the default item
        */
        }
  publie(){
    //publie.innerHTML+='<button><ion-icon name="text"></ion-icon><div>4 Comments</div></button>'
  }
}

export class NavigationDetailsPage {
  checklists

  constructor(params: NavParams) {
    //this.item = params.data.item;

  }
}

