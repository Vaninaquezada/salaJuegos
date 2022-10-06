import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BienvenidoComponent } from './componentes/bienvenido/bienvenido.component';
import { LoginComponent } from './componentes/login/login.component';
import { ErrorComponent } from './componentes/error/error.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChatComponent } from './componentes/chat/chat.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { ListadosComponent } from './componentes/listados/listados.component';
import { QuiensoyComponent } from './componentes/quiensoy/quiensoy.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { JuegosModule } from './componentes/juegos/juegos.module';
import { AngularFireModule } from '@angular/fire/compat';
@NgModule({
  declarations: [
    AppComponent,
    BienvenidoComponent,
    LoginComponent,
    ErrorComponent,
    RegistroComponent,
    ChatComponent,
    MenuComponent,
    ListadosComponent,
    QuiensoyComponent,
    EncuestaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    provideStorage(() => getStorage()),
    RouterModule,
    ReactiveFormsModule,
    FormsModule, 
    JuegosModule,   
    HttpClientModule
  ],
  exports: [MenuComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
