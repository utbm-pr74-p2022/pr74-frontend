import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Project } from '../models/project.model';
import { Role } from '../models/role.model';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { ProjectService } from '../services/project.service';
import { RoleService } from '../services/role.service';

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
    private projectService: ProjectService,
    private roleService: RoleService
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
          { label: 'Settings', icon: 'pi pi-fw pi-sliders-h', routerLink: "settings" }
        ],
      },
    ];
  }

  getRole() {
    return this.roleService.getRoleByUser(new User(this.auth.id, this.auth.username, "", new Role(0, this.auth.role as string, null), this.auth.image, true));
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
