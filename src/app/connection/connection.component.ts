import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss'],
})
export class ConnectionComponent implements OnInit {
  popAlert?: string;
  username!: string;
  password!: string;
  auth!: AuthService;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth = this.authService;
  }

  setPopAlert() {
    this.popAlert = 'popAlert';
  }

  login() {
    this.authService
      .login(this.username, this.password)
      .subscribe((isLoggedIn: boolean) => {
        this.setPopAlert();
        if (isLoggedIn) {
          this.router.navigate(['/board']);
        } else {
          this.password = '';
          this.router.navigate(['/']);
        }
      });
  }

  logout(){
    this.auth.logout();
    this.popAlert = "You have been disconnected";
  }
}
