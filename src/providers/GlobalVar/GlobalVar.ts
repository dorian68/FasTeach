import {Injectable} from '@angular/core';

@Injectable()
export class GlobalVar {
 private myGlobalVar: any;
    constructor() {
        this.myGlobalVar=[];
    }
    setMyGlobalVar(value) {
        this.myGlobalVar = value;
      }
    
    getMyGlobalVar() {
        return this.myGlobalVar;
    }
    
}