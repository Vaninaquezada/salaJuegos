import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  message: string = '';

  registerForm!: FormGroup;

  constructor(private authSvc: AuthService, private router: Router,private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      passwordR: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    })

  }
  async onRegister() {
    const { email, password } = this.registerForm.value;
    try {
      const user = this.authSvc.registro(email!, password!);

      if (await user) {
        //this.authSvc.login(email,password);
        this.router.navigate(['/bienvenido']);
      }
    } catch (error:any) {
      console.log(error);
       this.message = error.message;
    }
  }

  

}
