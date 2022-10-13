import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidoComponent } from './componentes/bienvenido/bienvenido.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { ErrorComponent } from './componentes/error/error.component';
import { JuegosComponent } from './componentes/juegos/juegos.component';
import { ListadosComponent } from './componentes/listados/listados.component';
import { LoginComponent } from './componentes/login/login.component';
import { QuiensoyComponent } from './componentes/quiensoy/quiensoy.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ResultadosEncuestaComponent } from './componentes/resultados-encuesta/resultados-encuesta.component';
import { AdminGuard } from './guard/admin.guard';
import { LogueadoGuard } from './guard/logueado.guard';

const routes: Routes = [ 
   { path: '', component: LoginComponent },
   { path: 'bienvenido', component: BienvenidoComponent },
   { path: 'quiensoy', component: QuiensoyComponent },
   { path: 'registro', component: RegistroComponent },
   { path: 'error', component: ErrorComponent },
   { path: 'encuesta', component: EncuestaComponent },
   { path: 'listados', component: ListadosComponent },
   { path: 'encuestaresultados', component: ResultadosEncuestaComponent, canActivate: [AdminGuard]  },
   { path: 'juegos', loadChildren: () => import('./componentes/juegos/juegos.module').then(m => m.JuegosModule), canActivate: [LogueadoGuard] }
  
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
