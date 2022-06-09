import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Sprint } from '../models/sprint.model';
import { Task } from '../models/task.model';
import { BacklogService } from '../services/backlog.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss'],
  providers: [MessageService]
})
export class BacklogComponent implements OnInit {

  sprintDialog!: boolean;
  taskDialog!: boolean;

  sprints!: Sprint[];
  tasks!: Task[];

  sprint!: Sprint;
  task!: Task;

  submitted!: boolean;

  selectedSprintStatus: any = null;

  sprintStatusList: any[] = [
    { name: 'OPEN', key: 'O' },
    { name: 'PROGRESS', key: 'P' },
    { name: 'CLOSE', key: 'C' },
  ];

  constructor(private backlogService: BacklogService,
    private taskService: TaskService,
    private messageService: MessageService
    ) { }

  ngOnInit(): void {
    this.selectedSprintStatus = this.sprintStatusList[0];
    this.backlogService.getSprints().then((data) => (this.sprints = data));
    this.taskService.getTasks().then((dataa) => (this.tasks = dataa));
  }

  openNewSprint() {
    this.sprint = {};
    this.submitted = false;
    this.sprintDialog = true;
  }

  saveProduct() {
    this.submitted = true;

    if (this.sprint.name) {
      if (this.sprint.id) {
        this.sprint.status = this.selectedSprintStatus['name'];
        this.sprints[this.findIndexById(this.sprint.id)] = this.sprint;
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

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.sprints.length; i++) {
      if (this.sprints[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): number {
    return Math.floor(Math.random() * Math.floor(299) + 1);
  }

  editProduct(sprint: Sprint) {
    this.sprint = { ...sprint };
    this.sprintDialog = true;
  }

}
