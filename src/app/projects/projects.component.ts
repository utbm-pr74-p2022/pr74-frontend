import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Project } from '../models/project.model';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  providers: [MessageService]
})
export class ProjectsComponent implements OnInit {
  projectDialog!: boolean;
  projects: Project[] = [];
  selectedProject?: any;
  projectForm!: FormGroup;
  project?: Project | null;
  titleForm: string = "";

  constructor(private projectService: ProjectService,
    private messageService: MessageService,
    private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.projectService.getAll().subscribe(
      (data :any) => {
        data._embedded.projects.forEach((d: any) => {
            this.projects.push(new Project(d.id, d.name, d.date, d.status));
          })
      });
    this.initForm();
  }

  initForm()
  {
    this.projectForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]]
      }
    )
  }

  openNew() {
    this.project = null;
    this.titleForm = "Create a new project";
    this.projectDialog = true;
  }

  saveProduct() {
    const name = this.projectForm.get('name')!.value;

    if (this.project == null) {
      this.projectService.save(new Project(null, name, null, null)).subscribe(
        (data: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Project created successfully'
          });
          this.projectDialog = false;
          this.projects = [...this.projects,new Project(data.id as number, data.name as string, data.date, data.status)];
        }
      );
    }
    else {
      this.project.name = name;
      this.projectService.update(this.project.id as number, this.project).subscribe(
        (data: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Project updated successfully'
          });
          this.projectDialog = false;
          this.projects.find(p => p.id === this.project!.id)!.name = data.name;
        },
        error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error creating sprint'
          });
        });
    }
  }

  editProduct(project: Project) {
    this.titleForm = "Edit this project"
    this.project = project;
    this.projectForm.get('name')!.setValue(project.name);
    this.projectDialog = true;
  }

  selectProject(selectedProject: Project){
    this.projectService.setSelectedProject(selectedProject);
  }

  deleteProject(project: Project){
    console.log(project.id);
    this.projectService.delete(project.id as number).subscribe(
      (data: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Project deleted successfully'
        });
        this.projects = this.projects.filter(p => p.id != project.id);
      },
      error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error creating sprint'
        });
      });
  }
}
