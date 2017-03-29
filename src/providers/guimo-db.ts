import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the GuimoDb provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GuimoDb {

  constructor(public http: Http, private sqlLite: SQLite) {
    console.log('construtor guimodb');
      this.sqlLite.create({
        name: 'guimo.db',
        location: 'default'
      }).then((db: SQLiteObject) =>{
        db.executeSql('CREATE TABLE IF NOT EXISTS deviceSelected(id VARCHAR(32) PRIMARY KEY, name VARCHAR(32), address VARCHAR(32), uuid VARCHAR(32))', {})
        .then(()=> console.log('Table Created'))
        .catch( err => {console.log(err)});
      })
  }

  openDb(db): Promise<SQLiteObject>{
    return this.sqlLite.create(db);
  }


  saveDeviceSelectedAndroid(device:any){
    this.openDb({name:'guimo.db',location:'default'})
      .then( (db:SQLiteObject) =>{
        db.executeSql('INSERT INTO deviceSelected (id,name,address) VALUES(?,?,?)',[device.id, device.name,device.address])
        .then(()=>{
          console.log('Device '+device.name+' inserido');
        }).catch(err =>{
          console.log('insert error =>',err);
        });
    })
  }

  getDeviceSelectedAndroid(deviceName): Promise<any>{
    return this.openDb({name: 'guimo.db',location:'default'})
        .then((db:SQLiteObject) => {
          return db.executeSql("SELECT * FROM deviceSelected WHERE name = ?",[deviceName]);
        });
  }
}
