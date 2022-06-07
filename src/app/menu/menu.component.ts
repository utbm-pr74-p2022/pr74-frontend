import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  items!: MenuItem[];
  auth!: AuthService;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.auth = this.authService;
    this.items = [
      {
        label: 'Navigation Bar',
        items: [
          { label: 'Projects', icon: 'pi pi-fw pi-th-large', routerLink: "projects", routerLinkActiveOptions: {exact: true} },
          { label: 'Board', icon: 'pi pi-fw pi-th-large', routerLink: "board", routerLinkActiveOptions: {exact: true} },
          { label: 'Backlog', icon: 'pi pi-fw pi-list', routerLink: "backlog" },
          { label: 'Settings', icon: 'pi pi-fw pi-sliders-h', routerLink: "settings" },
        ],
      },
    ];
  }



  logout(){
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
