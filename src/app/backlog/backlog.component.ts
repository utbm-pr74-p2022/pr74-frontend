import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Sprint } from '../models/sprint.model';
import { Task } from '../models/task.model';
import { BacklogService } from '../services/backlog.service';
import { MenuService } from '../services/menu.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss'],
  providers: [MessageService]
})
export class BacklogComponent implements OnInit, OnDestroy {

  sprintDialog!: boolean;
  taskDialog!: boolean;

  sprints!: Sprint[];
  tasks!: Task[];

  sprint!: Sprint;
  task!: Task;

  selectedProjectId?: number;

  submittedSprint!: boolean;
  submittedTask!: boolean;

  selectedSprintStatus: any = null;

  sprintStatusList: any[] = [
    { name: 'OPEN', key: 'O' },
    { name: 'PROGRESS', key: 'P' },
    { name: 'CLOSE', key: 'C' },
  ];

  constructor(private backlogService: BacklogService,
    private taskService: TaskService,
    private messageService: MessageService,
    private menuService: MenuService
    ) { }

  ngOnInit(): void {
    this.selectedSprintStatus = this.sprintStatusList[0];
    this.backlogService.getSprints().then((data) => (this.sprints = data));
    this.taskService.getTasks().then((data) => (this.tasks = data));
    const test = this.menuService.getSelectedProject().subscribe((d) =>{
      this.selectedProjectId = d.id;
      console.log(this.selectedProjectId);
    });
  }

  ngOnDestroy(): void {
  }

  openNewSprint() {
    this.sprint = {};
    this.submittedSprint = false;
    this.sprintDialog = true;
  }

  openNewTask() {
    this.task = new Task(0, "", 0, [0]);
    this.submittedTask = false;
    this.taskDialog = true;
  }

  saveSprint() {
    this.submittedSprint = true;

    if (this.sprint.name) {
      if (this.sprint.id) {
        this.sprint.status = this.selectedSprintStatus['name'];
        this.sprints[this.findIndexByIdSprint(this.sprint.id)] = this.sprint;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Sprint Updated',
          life: 3000,
        });
      } else {
        this.sprint.id = this.createId();
        this.sprint.sprintNo = 'SPR00001';
        this.sprint.dateFrom = new Date();
        this.sprint.dateTo = new Date();
        this.sprint.status = this.selectedSprintStatus['name'];
        this.sprints.push(this.sprint);

        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Sprint Created', life: 3000});
      }

      this.sprints = [...this.sprints];
      this.sprintDialog = false;
      this.sprint = {};
    }
  }

  saveTask() {
    this.submittedTask = true;

    if (this.task.name) {
      if (this.task.id) {
        this.tasks[this.findIndexByIdTask(this.task.id)] = this.task;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Task Updated',
          life: 3000,
        });
      } else {
        this.task.id = this.createId();
        this.tasks.push(this.task);

        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Task Created', life: 3000});
      }

      this.tasks = [...this.tasks];
      this.taskDialog = false;
      this.task = new Task(0, "", 0, [0]);
    }
  }

  // findIndexById(id: number, object: any[]): number {
  //   let index = -1;
  //   for (let i = 0; i < object.length; i++) {
  //     if (object[i].id === id) {
  //       index = i;
  //       break;
  //     }
  //   }
  //   return index;
  // }

  findIndexByIdSprint(id: number): number {
    let index = -1;
    for (let i = 0; i < this.sprints.length; i++) {
      if (this.sprints[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }
  findIndexByIdTask(id: number): number {
    let index = -1;
    for (let i = 0; i < this.tasks.length; i++) {
      if (this.tasks[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  createId(): number {
    return Math.floor(Math.random() * Math.floor(299) + 1);
  }

  editSprint(sprint: Sprint) {
    this.sprint = { ...sprint };
    this.sprintDialog = true;
  }

  editTask(task: Task) {
    this.task = { ...task };
    this.taskDialog = true;
  }

}
