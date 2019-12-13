import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private altertify: AlertifyService) {}
  canActivate( ): boolean {
    if (this.authService.isEmployee()) {
      return true;
    }
    this.altertify.error('You have no permissions to access this page!');
    this.router.navigate(['/home']);
    return false;
  }
}
