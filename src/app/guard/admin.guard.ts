import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  usuario:any;
  constructor(private router: Router, private authSvc: AuthService) {

    this.authSvc.getUsuario()?.subscribe((data) => {
			this.usuario = data;
		});;
   }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
    return this.checkUser();
  }
  async checkUser() {
    if (this.usuario !== null) {
      this.router.navigate(['/encuestaresultados']);
      return true
    }
    this.router.navigate(['/error']);
    return false;

  }
}
