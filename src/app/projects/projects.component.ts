import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project.model';
import { Status } from '../models/status.model';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projectDialog!: boolean;

  projects!: Project[];

  project!: Project;

  submitted!: boolean;

  status: Status[] = [{name: "OPEN"}];
  selectedStatus: Status[] = [];

  cities!: any[];
  selectedCities1: string = "";

  constructor(private projectService: ProjectService) {
    this.cities = [
      { name: "New York", code: "NY" },
      { name: "Rome", code: "RM" },
      { name: "London", code: "LDN" },
      { name: "Istanbul", code: "IST" },
      { name: "Paris", code: "PRS" }
    ];
  }

  ngOnInit(): void {
    this.projectService.getProjects().then((data) => (this.projects = data));
  }

  openNew() {
    this.project = {};
    this.submitted = false;
    this.projectDialog = true;
  }

  saveProduct() {
    this.submitted = true;

    if (this.project.title) {
      if (this.project.id) {
        this.projects[this.findIndexById(this.project.id)] = this.project;
        // this.messageService.add({
        //   severity: 'success',
        //   summary: 'Successful',
        //   detail: 'Product Updated',
        //   life: 3000,
        // });
      } else {
        this.project.id = this.createId();
        this.project.projectNo = "PRO00001";
        this.project.createdDate = new Date();
        this.projects.push(this.project);
        // this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
      }

      this.projects = [...this.projects];
      this.projectDialog = false;
      this.project = {};
    }
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.projects.length; i++) {
      if (this.projects[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): number {
    return Math.floor(Math.random() * Math.floor(299) + 1);
  }
}
