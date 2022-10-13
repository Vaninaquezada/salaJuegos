import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EncuestaService } from 'src/app/servicios/encuesta.service';

@Component({
  selector: 'app-resultados-encuesta',
  templateUrl: './resultados-encuesta.component.html',
  styleUrls: ['./resultados-encuesta.component.css']
})
export class ResultadosEncuestaComponent implements OnInit {

  lista: Observable<any[]>;
  constructor(private encuestaServ:EncuestaService) {
    this.lista = this.encuestaServ.getEncuestas();
    console.log(this.lista);
  }

  ngOnInit(): void {
  }

}
