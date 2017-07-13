import { PlatformCheck } from './platform-check';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the GuimoDb provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GuimoDb {

  constructor(public http: Http, private sqlLite: SQLite, private plt: PlatformCheck) {
    //console.log('construtor guimodb');
    this.plt.ready().then(() => {

      this.sqlLite.create({
        name: 'guimo.db',
        location: 'default'
      }).then((db: SQLiteObject) => {

        /*db.executeSql('DROP TABLE IF EXISTS missions',{}).then(()=>{
          console.log('deletado');
        }).catch( err =>{
          console.log(err);
        });*/

        db.executeSql('CREATE TABLE IF NOT EXISTS deviceSelected(id VARCHAR(32) PRIMARY KEY, name VARCHAR(32), address VARCHAR(32), uuid VARCHAR(32), selected INTEGER DEFAULT 0)', {})
          .then(() => console.log('Table DeviceSelected Created or Opened'))
          .catch(err => { console.log(err) });

        db.executeSql("CREATE TABLE IF NOT EXISTS missions (id INTEGER PRIMARY KEY, name VARCHAR(32), img VARCHAR(24), status INTEGER DEFAULT 0 )", {})
          .then(() => {
            db.executeSql("INSERT INTO missions(id,name,img,status) VALUES(?,?,?,?)", [1, 'Salvando o Guimo', 'Missao1.jpg', 1]).then(() => console.log('missao 01 inserida')).catch((err) => console.log('missao 01 already inserted'));
            db.executeSql("INSERT INTO missions(id,name,img) VALUES(?,?,?)", [2, 'Resgatando a Nave', 'Missao2.jpg']).then(() => console.log('missao 02 inserida')).catch((err) => console.log('missao 02 already inserted'));
            db.executeSql("INSERT INTO missions(id,name,img) VALUES(?,?,?)", [3, 'Curando o Guimo', 'Missao3.jpg']).then(() => console.log('missao 03 inserida')).catch((err) => console.log('missao 03 already inserted'));
          }).catch(err => console.log(err));

        db.executeSql("CREATE TABLE IF NOT EXISTS medals(id INTEGER PRIMARY KEY, name VARCHAR(32), img VARCHAR(24), status INTEGER DEFAULT 0 )", {})
          .then(() => {
            db.executeSql("INSERT INTO medals(id,name,img) VALUES(?,?,?)", [1, 'Médico das Galáxias', 'medalha_hq.jpg']).then(() => console.log('medalha 01 inserida')).catch((err) => console.log('medalha 01 already inserted'));
            db.executeSql("INSERT INTO medals(id,name,img) VALUES(?,?,?)", [2, 'Curandeiro das Galáxias', 'medalha2_hq.jpg']).then(() => console.log('medalha 02 inserida')).catch((err) => console.log('medalha 02 already inserted'));
          }).catch(err => console.log(err));

        db.executeSql('CREATE TABLE IF NOT EXISTS foods (id INTEGER PRIMARY KEY, name VARCHAR(32), img VARCHAR(32), status INTEGER DEFAULT 0, sync INTEGER DEFAULT 0)', {})
          .then(() => {
            console.log('Table Foods Created or Opened');
            db.executeSql("INSERT INTO foods (id, name, img) VALUES (?,?,?)", [1, 'Batata Intergalática', 'batata.png']).then(() => { console.log('batata inserido') }).catch((err) => { console.log('batata already inserted') });
            db.executeSql("INSERT INTO foods (id, name, img) VALUES (?,?,?)", [2, 'Hotdog do Espaço', 'hotdog.png']).then(() => { console.log('hotdog inserido') }).catch((err) => { console.log('hotdog already inserted') });
            db.executeSql("INSERT INTO foods (id, name, img) VALUES (?,?,?)", [3, 'Lanche maluco', 'lanche.png']).then(() => { console.log('lanche inserido') }).catch((err) => { console.log('lanche already inserted') });
            db.executeSql("INSERT INTO foods (id, name, img) VALUES (?,?,?)", [4, 'Maçã terreste', 'maca.png']).then(() => { console.log('maca inserido') }).catch((err) => { console.log('maca already inserted') });
            db.executeSql("INSERT INTO foods (id, name, img) VALUES (?,?,?)", [5, 'Refri e gás', 'soda.png']).then(() => { console.log('soda inserido') }).catch((err) => { console.log('soda already inserted') });
            db.executeSql("INSERT INTO foods (id, name, img) VALUES (?,?,?)", [6, 'Sorvete Gelado', 'sorvete.png']).then(() => { console.log('sorvete inserido') }).catch((err) => { console.log('sorvete already inserted') });
            db.executeSql("INSERT INTO foods (id, name, img) VALUES (?,?,?)", [7, 'SucoOo', 'suco.png']).then(() => { console.log('suco inserido') }).catch((err) => { console.log('suco already inserted') });
          })
          .catch(err => { console.log(err) });

        db.executeSql("CREATE TABLE IF NOT EXISTS screens(id INTEGER PRIMARY KEY, name VARCHAR(32), img VARCHAR(32), status INTEGER DEFAULT 0, sync INTEGER DEFAULT 0 )", {})
          .then(() => {
            console.log('Table Screens Created or Opened');
            db.executeSql("INSERT INTO screens(id,name,img) VALUES (?,?,?)", [1, 'Padrão', 'guimoPadrao_piscando.gif']).catch((err) => { console.log('IMG Padrão already inserted') });
            db.executeSql("INSERT INTO screens(id,name,img) VALUES (?,?,?)", [2, 'Óculos', 'guimoOculos_piscando.gif']).catch((err) => { console.log('IMG Óculos already inserted') });
            db.executeSql("INSERT INTO screens(id,name,img) VALUES (?,?,?)", [3, 'Menina', 'guimoMenina_piscando.gif']).catch((err) => { console.log('IMG Menina already inserted') });
            db.executeSql("INSERT INTO screens(id,name,img) VALUES (?,?,?)", [4, 'Bigode', 'guimoBigode_piscando.gif']).catch((err) => { console.log('IMG Bigode already inserted') });
          }).catch(err => { console.log(err) });

      });

    });

  }

  /**
   * Open or Create Database
   * @param db:{name:string, location:string} 
   */
  openDb(db: { name: string, location: string }): Promise<SQLiteObject> {
    return this.sqlLite.create(db);
  }


  /**
   * Save or Select deviceAndroid
   * @param device Array<any>
   */
  saveDeviceSelectedAndroid(device: any) {
    this.openDb({ name: 'guimo.db', location: 'default' })
      .then((db: SQLiteObject) => {

        db.executeSql("SELECT * FROM deviceSelected WHERE name = ?", [device.name]).then(res => {
          //console.log('item ->', res.rows.item(0));
          if (res.rows.item(0) == undefined) {
            db.executeSql("INSERT INTO deviceSelected (id, name, address, selected) VALUES (?,?,?,?)", [device.id, device.name, device.address, 1])
            db.executeSql("UPDATE deviceSelected SET selected = 0 WHERE id != ?", [device.id]).then(() => console.log('Updated device notSelected'));
            console.log('Inseriu device ' + device.name);
          } else {
            db.executeSql("UPDATE deviceSelected SET selected = 0 WHERE id != ?", [device.id]).then(() => console.log('Updated device notSelected'));
            db.executeSql("UPDATE deviceSelected SET selected = 1 WHERE id = ?", [device.id]).then(() => console.log('Updated device selected'));
          }
        }).catch(err => {
          console.log('err->', err);
        })


      })
  }

  /**
   * get Selected Android Device
   */
  getDeviceSelectedAndroid(): Promise<any> {
    return this.openDb({ name: 'guimo.db', location: 'default' })
      .then((db: SQLiteObject) => {
        return db.executeSql("SELECT * FROM deviceSelected WHERE selected = ?", [1]);
      });
  }

  getFoods(): Promise<any> {
    return this.openDb({ name: 'guimo.db', location: 'default' })
      .then((db: SQLiteObject) => {
        return db.executeSql("SELECT * FROM foods", {});
      });
  }

  updateFoodStatus(id: number, status: number): Promise<any> {
    return this.openDb({ name: 'guimo.db', location: 'default' }).then((db: SQLiteObject) => {
      return db.executeSql("UPDATE foods SET status = ?, sync = 0 WHERE id = ?", [status, id]);
    });
  }

  getScreens(): Promise<any> {
    return this.openDb({ name: 'guimo.db', location: 'default' })
      .then((db: SQLiteObject) => {
        return db.executeSql('SELECT * FROM screens', {});
      });
  }

  updateScreenStatus(id: number, status: number): Promise<any> {
    return this.openDb({ name: 'guimo.db', location: 'default' }).then((db: SQLiteObject) => {
      return db.executeSql("UPDATE screens SET status = ?, sync = 0 WHERE id = ?", [status, id]);
    });
  }

  getMissions(): Promise<any> {
    return this.openDb({ name: 'guimo.db', location: 'default' })
      .then((db: SQLiteObject) => {
        return db.executeSql("SELECT * FROM missions", {});
      });
  }

  resetMissions() {
    return this.openDb({ name: 'guimo.db', location: 'default' }).then((db: SQLiteObject) => {
      db.executeSql('UPDATE missions SET status = 1 WHERE id = 1', {});
      return db.executeSql('UPDATE missions SET status = 0 WHERE id > 1', {});
    });
  }

  openMissions() {
    return this.openDb({ name: 'guimo.db', location: 'default' }).then((db: SQLiteObject) => {
      return db.executeSql('UPDATE missions SET status = 1 WHERE id > 1', {});
    });
  }

  updateMissions(mission_id, status) {
    return this.openDb({ name: 'guimo.db', location: 'default' }).then((db: SQLiteObject) => {
      return db.executeSql("UPDATE missions SET status = ? WHERE id = ?", [status, mission_id]);
    });
  }

  resetMedals() {
    return this.openDb({ name: 'guimo.db', location: 'default' }).then((db: SQLiteObject) => {
      return db.executeSql('UPDATE medals SET status = 0 WHERE id = 1', {});
    });
  }
}
