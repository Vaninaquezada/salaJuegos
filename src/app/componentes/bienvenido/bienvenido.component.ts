import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { Observable } from 'rxjs';
import { UserProfile } from '@angular/fire/auth';
import { User } from 'src/app/clases/usuario';
@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.css']
})
export class BienvenidoComponent implements OnInit {
   user$: Observable<User>;
   user2$!: Observable<User>;
   usuario:any= null;;
  constructor(private authSvc: AuthService) {
 
    this.user$= this.authSvc.user$;
     this.authSvc.getUsuario()?.subscribe((data) => {
			this.usuario = data;
    
		});

   }

  ngOnInit(): void {
    this.user2$ = this.authSvc.user2$;
;
    }

}
