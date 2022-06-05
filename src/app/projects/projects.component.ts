import { Component, OnInit } from '@angular/core';
import { Project } from '../services/project';
import { ProjectService } from '../services/projectService';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects!: Project[];

  project!: Project;

  submitted!: boolean;

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getProjects().then(data => this.projects = data);
  }

  openNew() {
    this.project = {};
    this.submitted = false;
  }
}
