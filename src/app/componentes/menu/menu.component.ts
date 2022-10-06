import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
user:any;
  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.user = this.authSvc.getUsuarioFire();
  }
  async logOut() {
    try {
      await this.authSvc.logout();
      this.router.navigate(['/']);
    } catch (error) {
      console.log(error);
    }

  }

}
