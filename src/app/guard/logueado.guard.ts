import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogueadoGuard implements CanActivate {
  constructor(private router: Router, private authSvc: AuthService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.checkUser();
  }
  async checkUser() {
    if (await this.authSvc.getUsuario() !== null) {
      return true
    }
    this.router.navigate(['/error']);
    return false;

  }
}
