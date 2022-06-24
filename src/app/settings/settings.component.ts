import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';
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
    private roleService: RoleService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.userService.getAll().subscribe(
      (data :any) => {
        this.users = data._embedded.users;
        this.users = this.users.filter(u => u.enabled);
      });
    this.initForm();
  }

  initForm()
  {
    this.userForm = this.formBuilder.group(
      {
        username: ['', [Validators.required]],
        password: [''],
        image: ['', [Validators.required]],
        role: ['', [Validators.required]]
      }
    )
  }

  openNew() {
    this.user = null;
    this.titleForm = "Create a new user";
    this.userForm.reset();
    this.userForm.get('role')!.setValue(this.roleService.getRoleByName("ROLE_TEAM"));
    this.userDialog = true;
  }

  editUser(user: User) {
    this.titleForm = "Edit this user"
    this.user = user;
    this.userForm.reset();
    this.userForm.get('username')!.setValue(user.username);
    this.userForm.get('image')!.setValue(user.image);
    const userRole = user.role as Role;
    const role = new Role(userRole.id, userRole.name, this.getRole(user));
    this.userForm.get('role')!.setValue(role);
    this.userDialog = true;
  }

  saveUser() {
    const username = this.userForm.get('username')!.value;
    const password = this.userForm.get('password')!.value;
    const image = this.userForm.get('image')!.value;
    const role = this.userForm.get('role')!.value;

    if (this.user == null) {
      this.userService.save(new User(null, username, password, role, image, true)).subscribe(
        (data: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'User created successfully'
          });
          this.userDialog = false;

          this.users = [...this.users, new User(data.id, data.username, "", data.role, data.image, data.enabled)];
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
      this.user.username = username;
      this.user.image = image;
      this.user.role = role;

      this.updateUser();
    }
  }

  updateUser() {
    this.userService.update(this.user!.id as number, this.user!).subscribe(
      (data: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Project updated successfully'
        });
        this.userDialog = false;
        this.users.find(u => u.id === this.user!.id)!.username = data.username;
        this.users.find(u => u.id === this.user!.id)!.role = data.role;
        this.users.find(u => u.id === this.user!.id)!.image = data.image;
        this.users.find(u => u.id === this.user!.id)!.enabled = data.enabled;

        this.users = this.users.filter(u => u.enabled);
        this.user = null;
      },
      error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error updating project'
        });
      });
  }

  deleteUser(event: Event, user: User){
    this.user = user;
    this.user.enabled = false;
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to delete this user?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.updateUser();
      },
      reject: () => {
      }
    });
  }

  getRole(user: User) {
    return this.roleService.getRoleByUser(user);
  }

  getAllRoles() {
    return this.roleService.getAllRoles();
  }
}
