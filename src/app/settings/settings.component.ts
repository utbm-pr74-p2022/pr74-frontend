import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { User } from '../models/user.model';
import { RoleService } from '../services/role.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers: [MessageService]
})
export class SettingsComponent implements OnInit {
  userDialog!: boolean;
  users: User[] = [];
  userForm!: FormGroup;
  user?: User | null;
  titleForm: string = "";

  constructor(private messageService: MessageService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private roleService: RoleService) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe(
      (data :any) => {
        this.users = data._embedded.users;
      });
    this.initForm();
  }

  initForm()
  {
    this.userForm = this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
        image: ['', [Validators.required]],
        role: ['', [Validators.required]]
      }
    )
  }

  openNew() {
    this.user = null;
    this.titleForm = "Create a new user";
    this.userForm.reset();
    this.userDialog = true;
  }

  editProduct(user: User) {
    this.titleForm = "Edit this user"
    this.user = user;
    this.userForm.reset();
    this.userForm.get('username')!.setValue(user.username);
    this.userForm.get('image')!.setValue(user.image);
    this.userForm.get('role')!.setValue(user.role);
    this.userDialog = true;
  }

  saveUser() {
    const username = this.userForm.get('username')!.value;
    const password = this.userForm.get('password')!.value;
    const image = this.userForm.get('image')!.value;
    const role = this.userForm.get('role')!.value;

    if (this.user == null) {
      this.userService.save(new User(null, username, password, role, image)).subscribe(
        (data: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'User created successfully'
          });
          this.userDialog = false;

          this.users = [...this.users, new User(data.id, data.username, "", data.role, data.image)];
        },
        error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error creating user'
          });
        });
    }
    else {
      // this.project.name = name;
      // this.project.users = users;
      // this.projectService.update(this.project.id as number, this.project).subscribe(
      //   (data: any) => {
      //     this.messageService.add({
      //       severity: 'success',
      //       summary: 'Success',
      //       detail: 'Project updated successfully'
      //     });
      //     this.projectDialog = false;
      //     this.projects.find(p => p.id === this.project!.id)!.name = data.name;
      //   },
      //   error => {
      //     this.messageService.add({
      //       severity: 'error',
      //       summary: 'Error',
      //       detail: 'Error updating project'
      //     });
      //   });
    }
  }

  deleteProject(event: Event, user: User){

  }

  getRole(user: User) {
    return this.roleService.getRole(user);
  }

  getAllRoles() {
    return this.roleService.getAllRoles();
  }
}
