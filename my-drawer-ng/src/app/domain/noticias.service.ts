import { Injectable } from "@angular/core";
import { getJSON, request } from "tns-core-modules/http";
import {Couchbase} from "nativescript-couchbase";
const sqlite = require("nativescript-sqlite");

@Injectable()
export class NoticiasService {
  api: string = "https://1696fed7d6d5.ngrok.io";
  database: Couchbase;

  constructor() {

    this.database = new Couchbase("test-database");

    this.getDb((db) => {
      console.dir(db);
     /* db.each("select * from logs",
      (err, fila) => console.log("fila: ", fila),
      (err, totales) => console.log("Filas totales: ", totales));*/
      db.each("select * from favoritos",
      (err, fila) => console.log("fila: ", fila),
      (err, totales) => console.log("Filas totales: ", totales));
    }, () => console.log("error on getDB"));

    this.database.createView("logs", "1", (document, emitter) => emitter.emit(document._id,document));
      // se pasa: nombre de vista, versión de vista y mapeador de documentos para saber cómo deben verse en la vista.
      const rows = this.database.executeQuery("logs", {limit : 200});
      console.log("documentos: " + JSON.stringify(rows));
      
    
  }

  getDb(fnOk, fnError) {
    return new sqlite("mi_db_logs", (err, db) => {
      if (err) {
        console.error("Error al abrir db!", err);
      } else {
        console.log("Está la db abierta: ", db.isOpen() ? "Si" : "No");
          db.execSQL("CREATE TABLE IF NOT EXISTS favoritos (id INTEGER PRIMARY KEY AUTOINCREMENT, noticia TEXT)")
          .then((id) => {
              console.log("CREATE TABLE favoritos OK");
              fnOk(db);
          }, (error) => {
              console.log("CREATE TABLE favoritos ERROR", error);
              fnError(error);
          });

         /* db.execSQL("CREATE TABLE IF NOT EXISTS logs (id INTEGER PRIMARY KEY AUTOINCREMENT, texto TEXT)")
          .then((id) => {
              console.log("CREATE TABLE OK");
              fnOk(db);
          }, (error) => {
              console.log("CREATE TABLE ERROR", error);
              fnError(error);
          });*/

      }
    });
  }

  agregar(s: string) {
    return request({
      url: this.api + "/favs",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      content: JSON.stringify({
          nuevo: s
      })
    });
  }

  favs() {
    return getJSON(this.api + "/favs");
  }

  deleteFavorita(s: string){
    return request({
      url: this.api + "/favs",
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      content: JSON.stringify({
          borrar: s
      })
    });
  }

  ObtenerFavoritosDb() {
    /*this.getDb((db) => {
        db.execSQL("SELECT * FROM favoritos");
    }, () => console.log("Error on AgregarFavoritosDb"));*/
    return getJSON(this.api + "/favs");
}

  AgregarFavoritosDb(s: string) {
    this.getDb((db) => {
        db.execSQL("INSERT INTO favoritos (noticia) VALUES (?)", [s],
            (err, id) => console.log("Nuevo id: ", id)
        );
    }, () => console.log("Error on AgregarFavoritosDb"));
}

EliminarFavoritosDb(s: string) {
  this.getDb((db) => {
      db.execSQL("DELETE FROM favoritos WHERE noticia=?", [s],
          (err, res) => console.log(res)
      );
  }, () => console.log("Error on EliminarFavoritosDb"));
}

buscar(s: string) {

 const documentId = this.database.createDocument({ texto: s });
  console.log("nuevo id couchbase: ", documentId);

  return getJSON(this.api + "/get?q=" + s);
}

}
 