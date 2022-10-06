import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { JuegosComponent } from './juegos.component';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { MayoromenorComponent } from './mayoromenor/mayoromenor.component';
import { MijuegoComponent } from './mijuego/mijuego.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';


@NgModule({
  declarations: [
    JuegosComponent,
    AhorcadoComponent,
    MayoromenorComponent,
    MijuegoComponent,
    PreguntadosComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule
  ]
})
export class JuegosModule { }
