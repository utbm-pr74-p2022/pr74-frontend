import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Project } from '../models/project.model';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { ProjectService } from '../services/project.service';

const ROLE_SCRUM_MASTER = "Scrum master";
const ROLE_PRODUCT_OWNER = "Product owner";
const ROLE_TEAM = "Team";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  items!: MenuItem[];
  auth!: User;
  selectedProject!: Project;

  constructor(
    private router: Router,
    private authService: AuthService,
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(x =>
    {
      this.auth = x;
    });

    this.projectService.currentProject.subscribe(p =>
    {
      this.selectedProject = p;
    });
    this.items = [
      {
        label: 'Navigation Bar',
        items: [
          { label: 'Projects', icon: 'pi pi-fw pi-sitemap', routerLink: "projects", routerLinkActiveOptions: {exact: true} },
          { label: 'Board', icon: 'pi pi-fw pi-th-large', routerLink: "board", routerLinkActiveOptions: {exact: true} },
          { label: 'Backlog', icon: 'pi pi-fw pi-list', routerLink: "backlog" },
          // { label: 'Settings', icon: 'pi pi-fw pi-sliders-h', routerLink: "settings" },
        ],
      },
    ];
  }

  getRole() {
    if(this.auth.role == 'ROLE_PRODUCT_OWNER')
    {
      return ROLE_PRODUCT_OWNER;
    }
    else if(this.auth.role == 'ROLE_SCRUM_MASTER')
    {
      return ROLE_SCRUM_MASTER;
    }
    if(this.auth.role == 'ROLE_TEAM')
    {
      return ROLE_TEAM;
    }
    return "";
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
