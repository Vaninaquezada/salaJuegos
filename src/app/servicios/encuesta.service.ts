import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from "firebase/compat/app";
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Encuesta } from '../clases/encuesta';
@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  mail!: string | null;
  constructor(private afs: AngularFirestore, private authSvc: AuthService, private router: Router) {
    this.getUserMail();
  }



  addEncuesta(encuesta: Encuesta) {
    this.getUserMail();
    return this.afs.collection('encuesta').add({
      user: this.mail,
      pregunta1: encuesta.pregunta1,
      respuesta1: encuesta.respuesta1,
      pregunta2: encuesta.pregunta2,
      respuesta2: encuesta.respuesta2,
      pregunta3: encuesta.pregunta3,
      respuesta3: encuesta.respuesta3,
      nombre: encuesta.nombre,
      apellido: encuesta.apellido,
      edad: encuesta.edad,
      telefono: encuesta.telefono,
      sexo: encuesta.sexo,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  getEncuestas() {
    this.getUserMail();
    let listas = [];
    this.getUserMail();
    return this.getEncuesta().pipe(
      switchMap(res => {
        listas = res;
        return this.afs.collection('encuesta', ref => ref.orderBy('createdAt', 'desc')).valueChanges({ idField: 'id' }) as Observable<Encuesta[]>;
      }),

    )

  }

  private getEncuesta() {
    return this.afs.collection('encuesta', ref => ref.orderBy('createdAt', 'desc')).valueChanges({ idField: 'id' }) as Observable<Encuesta[]>;
  }

  private async getUserMail() {
    if (await this.authSvc.getUsuarioFire()) {
      this.mail = this.authSvc.getUsuarioFire()?.email!;
     console.log(this.mail);
    } else {
      this.mail = "usuario anonimo";
    }
  }

}
