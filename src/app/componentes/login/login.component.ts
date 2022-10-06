import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/clases/usuario';
import { ErrorService } from 'src/app/servicios/error.service';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });
  seleccion: string = '';;
  usuario: string = '';
  clave: string = '';
  message: string = '';
  constructor(private authSvc: AuthService, private router: Router, private error: ErrorService) { }

  ngOnInit(): void {
  }
  async onLogin() {
    const { email, password } = this.loginForm.value;
    try {
      //console.log("pagina " );
      const user = await this.authSvc.login(email!, password!);
      if (user) {
        this.message = "Bienvenido " + email;
        console.log("pagina 2" + JSON.stringify(user));
        setTimeout(() => {
          this.router.navigate(['/bienvenido']);
        }, 1000);
      }

    } catch (error: any) {
      console.log("pagina error " + error.code);
      /*  if (error instanceof Error) {
  
          console.log("error.message " + error.message);
          console.log("error.name " + error);
        }
        */
      this.message = this.error.getError(error.code);

    }



  }


  onChange(seleccion: string) {
    console.log(seleccion);
    this.message = "";
    switch (seleccion) {
      case "admin":

        this.loginForm.setValue({ email: "usuario@usuario.com", password: "123456" });
        console.log(this.loginForm.value);

        break;
      case "fulanito":
        // this.usuario ="fulanito@user.com";
        // this.clave ="222222";
        this.loginForm.setValue({ email: "mail@hola.com", password: "clave123" });
        break;
    }
  }
}
