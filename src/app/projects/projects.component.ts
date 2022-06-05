import { Component, OnInit } from '@angular/core';
import { Project } from '../services/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  products!: Project[];

  product!: Project;

  submitted!: boolean;

  constructor() {}

  ngOnInit(): void {}

  openNew() {
    this.product = {};
    this.submitted = false;
  }
}
