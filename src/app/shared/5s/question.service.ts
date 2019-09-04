import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
 createEvidencia:string;
 createQuestion:string;
  constructor(private sqlite: SQLite, private http: HttpClient) {
    this.createEvidencia='CREATE TABLE IF NOT EXISTS evidencia(evidenciaID INTEGER PRIMARY KEY, imagen TEXT,  fecha TEXT, questionID INTEGER, FOREIGN KEY(questionID) REFERENCES question108 (questionID))'
    this.createQuestion=`CREATE TABLE IF NOT EXISTS question108 (questionID INTEGER PRIMARY KEY, question TEXT, tipoAuditoriaID INTEGER,contestada INTEGER,lugarID INTEGER,preguntaID INTEGER)`
   }
/*
  consultTableExist() {
    return new Promise((resolve, reject) => {
      this.sqlite.create({
        name: 'data4.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
            // tslint:disable-next-line: max-line-length
            db.executeSql(`SELECT name FROM sqlite_master WHERE TYPE='table' AND name='question108'`, [])
            .then(res => resolve(res.rows.length)).catch(e => reject(JSON.stringify(e)));
      }).catch(e => reject(JSON.stringify(e)));
  }
  )
}*/

  makeQuestionsFromLugar(lugarID) {
    return new Promise((resolve, reject) => {
      this.sqlite.create({
        name: 'data4.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
            // tslint:disable-next-line: max-line-length
            db.executeSql(`CREATE TABLE IF NOT EXISTS question108 (questionID INTEGER PRIMARY KEY, question TEXT, tipoAuditoriaID INTEGER,contestada INTEGER,lugarID INTEGER,preguntaID INTEGER)`, [])
            .then(res => console.log('Se crea tabla')).catch(e => reject(JSON.stringify(e)));
            db.executeSql(`INSERT INTO question108  VALUES (null, '¿Los tableros contienen la informacion reciente y actualizada?',1,0,?,1)`, [lugarID])
            .then(res => resolve(res.rows.length)).catch(e => reject(JSON.stringify(e)));
            db.executeSql(`INSERT INTO question108  VALUES (null,'¿En las areas de trabajo y sus gavetas, solamente existen los articulos para uso inmediato, o inventario en proceso? (No deben haber articulos inecesarios: basura, chatarra, equipo dañado u obsoleto, etc.',1,0,?,2)`, [lugarID])
            .then(res => resolve(res.rows.length)).catch(e => reject(JSON.stringify(e)));
            db.executeSql(`INSERT INTO question108  VALUES (null,'¿El personal del area conoce el procedimiento de tarjetas rojas como un estandar para la eliminacion de excesos, sabe la ubicacion del area de tarjetas rojas, ha sido entrenado para aplicarlo?',1,0,?,3)`, [lugarID])
            .then(res => resolve(res.rows.length)).catch(e => reject(JSON.stringify(e)));
            db.executeSql(`INSERT INTO question108  VALUES (null,'¿Existe un lugar definido para cada articulo en el area de trabajo?(Identificado con su letrero o codigo de colores)',2,0,?,1)`, [lugarID])
            .then(res => resolve(res.rows.length)).catch(e => reject(JSON.stringify(e)));
            db.executeSql(`INSERT INTO question108  VALUES (null,'¿Todos los articulos en el area de encuentran en su lugar?',2,0,?,2)`, [])
            .then(res => resolve(res.rows.length)).catch(e => reject(JSON.stringify(e)));
            db.executeSql(`INSERT INTO question108  VALUES (null,'¿Los articulos en las areas estan en condiciones de uso? (Condicion de uso: Articulos visiblemente en buenas condiciones y que cumpla su funcion original sin problemas)',2,0,?,3)`, [lugarID])
            .then(res => resolve(res.rows.length)).catch(e => reject(JSON.stringify(e)));
            db.executeSql(`INSERT INTO question108  VALUES (null,'¿Los pasillos mesas de trabajo y rutas estan libres, despejados, seguros, estan correctamente delineados con pintura (en caso de tener cinta no debe estar rota, despegada o sucia)? ?',2,0,?,4)`, [lugarID])
            .then(res => resolve(res.rows.length)).catch(e => reject(JSON.stringify(e)));
            db.executeSql(`INSERT INTO question108  VALUES (null,'¿Los equipos de seguridad estan debidamente señalizados y verificados? (Unicamente donde aplique)',2,0,?,5)`, [lugarID])
            .then(res => resolve(res.rows.length)).catch(e => reject(JSON.stringify(e)));
            db.executeSql(`INSERT INTO question108  VALUES (null,'¿Se respetan los limites maximos y minimos establecidos para articulos repetidos o almacenados? ¿Son evidentes los limites?',2,0,?,6)`, [lugarID])
            .then(res => resolve(res.rows.length)).catch(e => reject(JSON.stringify(e)));
            db.executeSql(`INSERT INTO question108  VALUES (null,'¿El area en general esta libre de fugas de agua, vapor, aceite y aire?',3,0,?,1)`, [lugarID])
            .then(res => resolve(res.rows.length)).catch(e => reject(JSON.stringify(e)));
            db.executeSql(`INSERT INTO question108  VALUES (null,'¿Existe suciedad, manchas de aceite, grasa, polvo, o residuos en Maquinaria, Equipos, Herramientas, diques y charolas de contencion?',3,0,?,2)`, [lugarID])
            .then(res => resolve(res.rows.length)).catch(e => reject(JSON.stringify(e)));
            db.executeSql(`INSERT INTO question108  VALUES (null,'En pasillos y piso en general ¿Encuentras manchas de aceite, grasa, polvo y residuos?',3,0,?,3)`, [lugarID])
            .then(res => resolve(res.rows.length)).catch(e => reject(JSON.stringify(e)));
            db.executeSql(`INSERT INTO question108  VALUES (null,'¿Los drenajes, registros, alcantarillado estan libres? (No debe haber acumulacion o charcos)',3,0,?,4)`, [lugarID])
            .then(res => resolve(res.rows.length)).catch(e => reject(JSON.stringify(e)));
            db.executeSql(`INSERT INTO question108  VALUES (null,'Estan los instrumentos de verificacion (Manometros, termometros y niveles) limpios y en buen estado',1,0,?,5)`, [lugarID])
            .then(res => resolve(res.rows.length)).catch(e => reject(JSON.stringify(e)));
      }).catch(e => reject(JSON.stringify(e)));
  })
}

                                                         
getQuestionsOpen(lugarID:Number, contestada:number) {
  let questions = [];
  let sql:string;
  if (contestada==0) {
    sql=`SELECT  q.questionID, q.question, q.tipoAuditoriaID, q.contestada, IFNULL( e.numEvidencias,0) numEvidencias FROM question108 q 
                LEFT JOIN (SELECT questionID, COUNT(*) numEvidencias FROM evidencia  GROUP BY questionID) e ON e.questionID=q.questionID WHERE q.lugarID=? AND contestada=0`;
  }else if (contestada==1) {
    sql=`SELECT  q.questionID, q.question, q.tipoAuditoriaID, q.contestada, IFNULL( e.numEvidencias,0) numEvidencias,
                   CASE IFNULL( e.numEvidencias,0) WHEN 0 THEN 4 WHEN  1 OR 2 THEN 3 WHEN  3 OR 4 THEN 2 WHEN  5 OR 6 THEN 1 WHEN  7 OR 8 THEN 0    END calificacion
                         FROM question108 q 
                          LEFT JOIN (SELECT questionID, COUNT(*) numEvidencias FROM evidencia  GROUP BY questionID) e ON e.questionID=q.questionID WHERE q.lugarID=? AND contestada=1`;
  }
      // tslint:disable-next-line: align
      return new Promise((resolve, reject) => {
        this.sqlite.create({
          name: 'data4.db',
          location: 'default'
        })
          .then((db: SQLiteObject) => {
            db.executeSql(this.createQuestion, [])
            .then(res => console.log('se crea preguntas table')).catch(e => reject(JSON.stringify(e)));
            db.executeSql(this.createEvidencia, [])
            .then(res => console.log('se crea evidencias table')).catch(e => reject(JSON.stringify(e)));
              // tslint:disable-next-line: max-line-length
              db.executeSql(sql, [lugarID])
              .then(res => {
                for (let i = 0; i < res.rows.length; i++) {
                  questions.push(res.rows.item(i));
                }
                resolve(questions);
              }
              ).catch(e => reject(JSON.stringify(e)));
        }).catch(e => reject(JSON.stringify(e)));
    })
  }

  async updateQuestion(id, value) { 
    return await new Promise((resolve, reject) => {
          this.sqlite.create({
            name: 'data4.db',
            location: 'default'
        }).then((db: SQLiteObject) => {
          db.executeSql(`UPDATE question108 SET contestada=?  WHERE questionID=?`, [value, id])
          .then(res => {
            resolve('bien update');
          }, (error) => {
              reject(error);
          }).catch(e => reject(JSON.stringify(e)));
      }).catch(e => reject(JSON.stringify(e)));
  });
 
}

}
