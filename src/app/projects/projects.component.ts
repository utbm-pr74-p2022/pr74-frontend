import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Project } from '../models/project.model';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { ProjectService } from '../services/project.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  providers: [MessageService]
})
export class ProjectsComponent implements OnInit {
  projectDialog!: boolean;
  projects: Project[] = [];
  users: User[] = [];
  selectedProject?: any;
  projectForm!: FormGroup;
  project?: Project | null;
  titleForm: string = "";
  auth!: User;

  constructor(private projectService: ProjectService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe(x =>
      {
        this.auth = x;
      });

    this.projectService.getAll().subscribe(
      (data :any) => {
        this.projects = data._embedded.projects;
        let i = 0;
        this.projects.forEach(
          p => {
            p.users = data._embedded.projects[i].users._embedded.users;
            i++;
        });
      });

    this.userService.getAll().subscribe(
      (data :any) => {
        this.users = data._embedded.users;
      });
    this.initForm();
  }

  initForm()
  {
    this.projectForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        users: ['', [Validators.required]]
      }
    )
  }

  openNew() {
    this.project = null;
    this.titleForm = "Create a new project";
    this.projectForm.reset();
    this.projectDialog = true;
  }

  saveProduct() {
    const name = this.projectForm.get('name')!.value;
    const users = this.projectForm.get('users')!.value;

    if (this.project == null) {
      this.projectService.save(new Project(null, name, null, null, users)).subscribe(
        (data: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Project created successfully'
          });
          this.projectDialog = false;
          this.projects = [...this.projects,new Project(data.id as number, data.name as string, data.date, data.status, data.users._embedded.users)];
        },
        error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error creating project'
          });
        });
    }
    else {
      this.project.name = name;
      this.project.users = users;
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
            detail: 'Error updating project'
          });
        });
    }
  }

  editProduct(project: Project) {
    this.titleForm = "Edit this project"
    this.project = project;
    this.projectForm.get('name')!.setValue(project.name);
    this.projectForm.get('users')!.setValue(project.users);
    this.projectDialog = true;
  }

  selectProject(selectedProject: Project){
    this.projectService.setSelectedProject(selectedProject);

    this.messageService.add({
      severity: 'info',
      summary: 'Information',
      detail: 'Project ' + selectedProject.name + ' selected'
    });

  }

  deleteProject(project: Project){
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
          detail: 'Error deleting project'
        });
      });
  }
}
