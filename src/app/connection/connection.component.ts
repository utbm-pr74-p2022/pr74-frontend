import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  connectionForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.auth = this.authService;
    this.initForm();
  }

  initForm()
  {
    this.connectionForm = this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
      }
    )
  }

  login() {
    const username = this.connectionForm.get('username')!.value;
    const password = this.connectionForm.get('password')!.value;

    /*this.authService
      .login(username, password)
      .subscribe((isLoggedIn: boolean) => {
        if (isLoggedIn) {
          this.router.navigate(['/projects']);
        } else {
          this.showFailedConnection();
          this.password = '';
          this.router.navigate(['/']);
        }
      });*/

      this.authService.login(username, password).then(
        () => {
          this.router.navigate(['/projects']);
        },
        (error) => {
          this.showFailedConnection();
          this.password = '';
          this.router.navigate(['/']);
        }
      );
  }

  showFailedConnection() {
    this.messageService.add({severity:'error', summary: 'Failed', detail: 'Username or password is wrong!'});
  }

  logout(){
    this.auth.logout();
    this.popAlert = "You have been disconnected";
  }
}
