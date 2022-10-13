import { Injectable } from '@angular/core';
import { filter, first, map, switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {collection,doc, docData, Firestore, setDoc,serverTimestamp } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { User } from '../clases/usuario';
import {
	Auth,
  getAuth, 
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signOut,
  UserCredential,authState
} from '@angular/fire/auth';
import { ErrorService } from './error.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<any>;
  public user2$!: Observable<any>;
constructor(private afAuth: Auth, private firestore: Firestore,private afs: AngularFirestore,private error:ErrorService) {
  this.user$ = authState(this.afAuth).pipe(
    map((user) => {
      
      if (user) {
        console.log(user);
        return  this.afs.doc<User>(`user/${user.uid}`).valueChanges();

      }
      return of(null);
    })
  );
 
  this.user2$ = authState(this.afAuth);
}

async login(email: string, password: string) {

  try {
    const user = await signInWithEmailAndPassword(this.afAuth, email, password);
    return user;
 } catch (e:any) {
  console.log(e.code)
         throw new Error(this.error.getError(e.code));  
   }

}


async registro(email: string, password: string) {
  try {
    const user = await createUserWithEmailAndPassword(this.afAuth, email, password);

    this.updateUserData(user);
    return user;
  } catch (e:any) {
    console.log(e.code)
           throw new Error(this.error.getError(e.code));  
     }
}

async logout() {
  try {
    await this.afAuth.signOut();
  } catch (error) {
    console.log(error);
  }

}
getUsuario() {
  try {
		const user = this.afAuth.currentUser;
    console.log(user!.uid);
		const userDocRef = doc(this.firestore, `user/${user!.uid}`);

		return docData(userDocRef, { idField: 'uid' });

  } catch (error) {
     return null;
  }

  
}



getUsuarioFire() {
  const user = this.afAuth.currentUser;

       return user;

}

private async updateUserData(user: any) {

  const userRef = doc(this.firestore, `user/${user.user.uid}`);

  const data: User = {
    uid: user.user.uid,
    email: user.user.email,
    displayName: user.user.displayName,
    rol:"jugador",
    myCustomData: "lola"
  };
  console.log("registo Data ",data);
  await setDoc(userRef, {
    data
  });
  return true;
}

async updateLogUser(email: string) {
  const user = this.afAuth.currentUser;
    try {
      await setDoc(doc(this.firestore, 'userlog'), {
        email: email,
        fechaIngreso: serverTimestamp()
      });

      return true;
    } catch (error) {
      return error;
    }
  
}

}
