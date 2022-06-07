import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss'],
  providers: [MessageService]
})
export class ConnectionComponent implements OnInit {
  popAlert?: string;
  username!: string;
  password!: string;
  auth!: AuthService;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.auth = this.authService;
  }

  login() {
    this.authService
      .login(this.username, this.password)
      .subscribe((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.router.navigate(['/']);
        } else {
          this.showFailedConnection();
          this.password = '';
          this.router.navigate(['/']);
        }
      });
  }

  showFailedConnection() {
    this.messageService.add({severity:'error', summary: 'Failed', detail: 'Username or password is wrong!'});
  }

  logout(){
    this.auth.logout();
    this.popAlert = "You have been disconnected";
  }
}
