import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Priority } from '../models/priority.model';
import { Project } from '../models/project.model';
import { Sprint } from '../models/sprint.model';
import { Status } from '../models/status.model';
import { Task } from '../models/task.model';
import { User } from '../models/user.model';
import { ProjectService } from '../services/project.service';
import { SprintService } from '../services/sprint.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  providers: [MessageService]
})
export class BoardComponent implements OnInit {

  selectedProject?: Project;

  statuses: Status[] = [];
  tasks: Task[] = [];

  draggedTask!: Task;

  taskDialog!: boolean;
  taskForm!: FormGroup;
  titleForm: string = "";
  priorities: Priority[] = [];
  users: User[] = [];
  task!: Task | null;

  constructor(private messageService: MessageService,
    private taskService: TaskService,
    private projectService: ProjectService,
    private sprintService: SprintService,
    private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.projectService.currentProject.subscribe(p =>
    {
      this.selectedProject = p;
      if(this.selectedProject.id != undefined && this.selectedProject.id != null)
      {
        this.projectService.findOne(this.selectedProject.id).subscribe(
        (data: any) => {
          this.statuses = data.statuses._embedded != undefined ? data.statuses._embedded.statuses : [];
          const sprints = data.sprints._embedded != undefined ? data.sprints._embedded.sprints : [];
          const actualSprint = sprints.find((s: Sprint) => new Date(s.startDate as string) < new Date() && new Date(s.endDate as string) > new Date());
          this.priorities = data.priorities._embedded != undefined ? data.priorities._embedded.priorities : [];
          const usrs = data.users._embedded != undefined ? data.users._embedded.users : [];
          this.users = [new User(0, "", "", null, null, true), ...usrs];
          if(actualSprint != null)
          {
            this.sprintService.findOne(actualSprint.id).subscribe(
              (data: any) => {
                this.tasks = data.tasks._embedded != undefined ? data.tasks._embedded.tasks : [];
            });
          }
        });
      }
    });
    this.initForm();
  }

  initForm()
  {
    this.taskForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        description: [''],
        priority: ['', [Validators.required]],
        user: ['']
      }
    )
  }

  dragStart(task: Task) {
      this.draggedTask = task;
  }

  drop(id: number) {
    if (this.draggedTask) {
      this.draggedTask.status = this.statuses.find(c => c.id == id) as Status;
      this.taskService.update(this.draggedTask.id as number, this.draggedTask).subscribe(
        (data: any) => {
          this.tasks.find(t => t.id == this.draggedTask.id)!.status = this.statuses.find(c => c.id == id) as Status;
          this.draggedTask = null!;
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

  dragEnd() {
    this.draggedTask = null!;
  }

  viewTask(task: Task) {
    this.titleForm = "View task : " + task.name;
    this.task = new Task(task.id, task.name, task.description, task.priority, task.user, task.backlog, task.sprint, task.status);
    this.taskForm.get('name')!.setValue(task.name);
    this.taskForm.get('description')!.setValue(task.description);
    this.taskForm.get('priority')!.setValue(task.priority);
    this.taskForm.get('user')!.setValue(task.user);
    this.taskDialog = true;
  }

  saveTask() {
    const name = this.taskForm.get('name')!.value;
    const description = this.taskForm.get('description')!.value;
    const priority = this.taskForm.get('priority')!.value;
    const user = this.taskForm.get('user')!.value;

    this.task!.name = name;
    this.task!.description = description;
    this.task!.priority = priority;
    if(user != null) {
      this.task!.user = user.id != 0 ? user : null;
    }

    this.taskService.update(this.task!.id as number, this.task as Task).subscribe(
      (data: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Task updated successfully'
        });
        this.taskDialog = false;

        this.tasks = [this.task as Task, ...this.tasks.filter(p => p.id !== this.task!.id)];
      },
      error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error updating task'
        });
      });
  }
}
