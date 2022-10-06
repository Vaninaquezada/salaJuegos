import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent implements OnInit {

  constructor(private authSvc: AuthService) { }

  ngOnInit(): void {
  }

}
