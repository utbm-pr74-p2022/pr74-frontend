import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Project } from '../models/project.model';
import { AuthService } from '../services/auth.service';
import { MenuService } from '../services/menu.service';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  items!: MenuItem[];
  auth!: AuthService;
  selectedProjectt!: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private projectService: ProjectService,
    private menuService: MenuService
  ) { }

  ngOnInit() {
    this.auth = this.authService;
    this.menuService.getSelectedProject().subscribe((d) =>{
      this.selectedProjectt = d;
    });
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
