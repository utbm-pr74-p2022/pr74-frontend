import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ){

  }

  canActivate() {
    if(this.authService.isLoggedIn) return true;

    this.router.navigate(['/']);
    return false;
  }

  /*canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/auth/signin']);
      return false;
    }
    return true;
  }*/
}
