import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Sprint } from '../models/sprint.model';
import { Task } from '../models/task.model';
import { Project } from '../models/project.model';
import { ProjectService } from '../services/project.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SprintService } from '../services/sprint.service';
import { DatePipe } from '@angular/common';
import { TaskService } from '../services/task.service';
import { Backlog } from '../models/backlog.model';
import { Priority } from '../models/priority.model';

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

  sprint!: Sprint | null;
  task!: Task | null;

  selectedProject?: Project;

  backlogid: number = 0;
  priorities: Priority[] = [];

  selectedSprintStatus: any = null;

  sprintForm!: FormGroup;
  taskForm!: FormGroup;

  constructor(private messageService: MessageService,
    private projectService: ProjectService,
    private sprintService: SprintService,
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    public datepipe: DatePipe) { }

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
            s.status = this.getStatus(s.startDate as string, s.endDate as string);
          });
          this.tasks = data.backlog.tasks._embedded.tasks;
          this.backlogid = data.backlog.id;
          this.priorities = data.priorities._embedded.priorities;
        });
      }
    });
    this.initForm();
  }

  initForm()
  {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    this.sprintForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        startDate: [new Date(), [Validators.required]],
        endDate: [endDate, [Validators.required]]
      }
    )
    this.taskForm = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        priority: ['', [Validators.required]]
      }
    )
  }

  openNewSprint() {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    this.sprint = null;
    this.sprintForm.get('name')!.setValue('');
    this.sprintForm.get('startDate')!.setValue(new Date());
    this.sprintForm.get('endDate')!.setValue(endDate);
    this.sprintDialog = true;
  }

  openNewTask() {
    this.task = null;
    this.taskForm.get('name')!.setValue('')
    this.taskForm.get('priority')!.setValue(this.priorities[0])
    this.taskDialog = true;
  }

  saveSprint() {
    const name = this.sprintForm.get('name')!.value;
    const startDate = this.datepipe.transform(this.sprintForm.get('startDate')!.value, 'yyyy-MM-dd');
    const endDate = this.datepipe.transform(this.sprintForm.get('endDate')!.value, 'yyyy-MM-dd');

    if (this.sprint == null) {
      this.sprintService.save(new Sprint(null, name, "", startDate, endDate, null, this.selectedProject)).subscribe(
        (data: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Sprint created successfully'
          });
          this.sprintDialog = false;
          this.sprints = [...this.sprints, new Sprint(data.id, data.name, data.description, data.startDate, data.endDate, this.getStatus(data.startDate, data.endDate), this.selectedProject)];
        },
        error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error creating sprint'
          });
        }
      );
    }
    else {
      this.sprint.name = name;
      this.sprint.startDate = startDate;
      this.sprint.endDate = endDate;
      this.sprint.project = this.selectedProject;

      this.sprintService.update(this.sprint.id as number, this.sprint).subscribe(
      (data: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Sprint updated successfully'
        });
        this.sprintDialog = false;
        this.sprints.find(p => p.id === this.sprint!.id)!.name = data.name;
        this.sprints.find(p => p.id === this.sprint!.id)!.status = this.getStatus(data.startDate, data.endDate);
      },
      error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error updating sprint'
        });
      });
    }
  }

  saveTask() {
    const name = this.taskForm.get('name')!.value;
    const priority = this.taskForm.get('priority')!.value;

    if (this.task == null) {
      this.taskService.save(new Task(null, name, priority, null, null, new Backlog(this.backlogid, this.tasks))).subscribe(
        (data: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Sprint created successfully'
          });
          this.sprintDialog = false;
          this.sprints = [...this.sprints, new Sprint(data.id, data.name, data.description, data.startDate, data.endDate, this.getStatus(data.startDate, data.endDate), this.selectedProject)];
        },
        error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error creating sprint'
          });
        }
      );
    }
    else {
      this.task.name = name;
      this.task.priority = priority;

      this.taskService.update(this.task.id as number, this.task).subscribe(
      (data: any) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Sprint updated successfully'
        });
        this.taskDialog = false;
        this.tasks.find(p => p.id === this.sprint!.id)!.name = data.name;
        },
      error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error updating sprint'
        });
      });
    }
   }

  getStatus(startDate: string, endDate: string) {
    return new Date(endDate) < new Date() ? 'CLOSE' : new Date(startDate) > new Date() ? 'OPEN' : 'PROGRESS';
  }

  editSprint(sprint: Sprint) {
    this.sprint = sprint
    this.sprintForm.get('name')!.setValue(sprint.name);
    this.sprintForm.get('startDate')!.setValue(sprint.startDate);
    this.sprintForm.get('endDate')!.setValue(sprint.endDate);
    this.sprintDialog = true;
  }

  editTask(task: Task) {
    this.task = task;
    this.taskForm.get('name')!.setValue(task.name);
    this.taskForm.get('priority')!.setValue(task.priority);
    this.taskDialog = true;
  }

}
