import { Component, OnInit } from '@angular/core';
import { MenuItem} from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  items!: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Navigation Bar',
        items: [
          { label: 'Board', icon: 'pi pi-fw pi-th-large', routerLink: "board"},
          { label: 'Backlog', icon: 'pi pi-fw pi-list', routerLink: "backlog" },
          { label: 'Settings', icon: 'pi pi-fw pi-sliders-h', routerLink: "settings" },
        ],
      },
    ];
  }
}
