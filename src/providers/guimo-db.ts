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
    //console.log('construtor guimodb');
      this.sqlLite.create({
        name: 'guimo.db',
        location: 'default'
      }).then((db: SQLiteObject) =>{
        db.executeSql('CREATE TABLE IF NOT EXISTS deviceSelected(id VARCHAR(32) PRIMARY KEY, name VARCHAR(32), address VARCHAR(32), uuid VARCHAR(32), selected INTEGER DEFAULT 0)', {})
        .then(()=> console.log('Table Created or Opened'))
        .catch( err => {console.log(err)});

        /*db.executeSql('DROP TABLE IF EXISTS deviceSelected',{}).then(()=>{
          console.log('deletado');
        }).catch( err =>{
          console.log(err);
        })*/
      })
  }

  /**
   * Open or Create Database
   * @param db:{name:string, location:string} 
   */
  openDb(db): Promise<SQLiteObject>{
    return this.sqlLite.create(db);
  }


  /**
   * Save or Select deviceAndroid
   * @param device Array<any>
   */
  saveDeviceSelectedAndroid(device:any){
    this.openDb({name:'guimo.db',location:'default'})
      .then( (db:SQLiteObject) =>{
        
        db.executeSql("SELECT * FROM deviceSelected WHERE name = ?",[device.name]).then(res =>{
          //console.log('item ->', res.rows.item(0));
          if(res.rows.item(0) == undefined){
            db.executeSql("INSERT INTO deviceSelected (id, name, address, selected) VALUES (?,?,?,?)",[device.id,device.name,device.address,1])
            db.executeSql("UPDATE deviceSelected SET selected = 0 WHERE id != ?",[device.id]).then(() => console.log('Updated device notSelected'));
            console.log('Inseriu device '+device.name);  
          }else{
            db.executeSql("UPDATE deviceSelected SET selected = 0 WHERE id != ?",[device.id]).then(() => console.log('Updated device notSelected'));
            db.executeSql("UPDATE deviceSelected SET selected = 1 WHERE id = ?",[device.id]).then(()=>console.log('Updated device selected'));
          }
        }).catch(err =>{
          console.log('err->', err);
        })

        
    })
  }

  /**
   * get Selected Android Device
   */
  getDeviceSelectedAndroid(): Promise<any>{
    return this.openDb({name: 'guimo.db',location:'default'})
        .then((db:SQLiteObject) => {
          return db.executeSql("SELECT * FROM deviceSelected WHERE selected = ?",[1]);
        });
  }
}
