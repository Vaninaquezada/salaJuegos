import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/clases/usuario';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  user$: Observable<any> = this.authSvc.user$;
  user2$!: Observable<User>;

  constructor(private authSvc: AuthService, private router: Router) {
    console.log("menu",this.user2$);
   }

  ngOnInit(): void {

      this.user2$ =this.authSvc.user2$;


  console.log("menu",this.user2$);
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
