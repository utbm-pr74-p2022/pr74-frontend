import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Project } from '../models/project.model';
import { MenuService } from '../services/menu.service';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  providers: [MessageService]
})
export class ProjectsComponent implements OnInit {
  projectDialog!: boolean;

  projects!: Project[];

  project!: Project;

  submitted!: boolean;

  selectedStatus: any = null;

  selectedProject?: any;

  projectStatusList: any[] = [
    { name: 'OPEN', key: 'O' },
    { name: 'PROGRESS', key: 'P' },
    { name: 'CLOSE', key: 'C' },
  ];

  constructor(private projectService: ProjectService,
    private menuService: MenuService,
    private messageService: MessageService
    ) {}

  ngOnInit(): void {
    this.selectedStatus = this.projectStatusList[0];
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
        this.project.status = this.selectedStatus['name'];
        this.projects[this.findIndexById(this.project.id)] = this.project;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000,
        });
      } else {
        this.project.id = this.createId();
        this.project.projectNo = 'PRO00001';
        this.project.createdDate = new Date();
        this.project.status = this.selectedStatus['name'];
        this.projects.push(this.project);

        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
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

  editProduct(project: Project) {
    this.project = { ...project };
    this.projectDialog = true;
  }

  selectProject(selectedProject: string){
    this.menuService.setSelectedProject(selectedProject);
  }



}
