import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Sprint } from '../models/sprint.model';
import { Task } from '../models/task.model';
import { BacklogService } from '../services/backlog.service';
import { TaskService } from '../services/task.service';
import { Project } from '../models/project.model';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss'],
  providers: [MessageService]
})
export class BacklogComponent implements OnInit {

  sprintDialog!: boolean;
  taskDialog!: boolean;

  sprints: Sprint[] = [];
  tasks: Task[] = [];

  sprint!: Sprint;
  task!: Task;

  selectedProject?: Project;

  submittedSprint!: boolean;
  submittedTask!: boolean;

  selectedSprintStatus: any = null;

  constructor(private messageService: MessageService,
    private projectService: ProjectService
    ) { }

  ngOnInit(): void {
    this.projectService.currentProject.subscribe(p =>
    {
      this.selectedProject = p;
      if(this.selectedProject.id != undefined && this.selectedProject.id != null)
      {
        this.projectService.findOne(this.selectedProject.id).subscribe(
        (data: any) => {
          this.sprints = data.sprints._embedded.sprints;
          this.sprints.forEach(s => {
            s.status = new Date(s.endDate as string) < new Date() ? 'CLOSE' : new Date(s.startDate as string) > new Date() ? 'OPEN' : 'PROGRESS';
          });
          this.tasks = data.backlog.tasks._embedded.tasks;
        });
      }
    });
  }

  openNewSprint() {
    this.sprint = {};
    this.submittedSprint = false;
    this.sprintDialog = true;
  }

  openNewTask() {
    //this.task = new Task(0, "", 0, [0]);
    this.submittedTask = false;
    this.taskDialog = true;
  }

  saveSprint() { }

  saveTask() { }

  editSprint(sprint: Sprint) {
    this.sprint = { ...sprint };
    this.sprintDialog = true;
  }

  editTask(task: Task) {
    this.task = { ...task };
    this.taskDialog = true;
  }

}
