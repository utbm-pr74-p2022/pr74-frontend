import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project.model';
import { Sprint } from '../models/sprint.model';
import { Status } from '../models/status.model';
import { Task } from '../models/task.model';
import { ProjectService } from '../services/project.service';
import { SprintService } from '../services/sprint.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  selectedProject?: Project;

  statuses: Status[] = [];
  tasks: Task[] = [];

  draggedTask!: Task;

  constructor(private taskService: TaskService,
    private projectService: ProjectService,
    private sprintService: SprintService) {}

  ngOnInit(): void {
    this.projectService.currentProject.subscribe(p =>
    {
      this.selectedProject = p;
      if(this.selectedProject.id != undefined && this.selectedProject.id != null)
      {
        this.projectService.findOne(this.selectedProject.id).subscribe(
        (data: any) => {
          this.statuses = data.statuses._embedded.statuses;
          const sprints = data.sprints._embedded.sprints;
          const actualSprint = sprints.find((s: Sprint) => new Date(s.startDate as string) < new Date() && new Date(s.endDate as string) > new Date());
          if(actualSprint != null)
          {
            this.sprintService.findOne(actualSprint.id).subscribe(
              (data: any) => {
                this.tasks = data.tasks._embedded.tasks;
            });
          }
        });
      }
    });
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
      });
    }
  }

  dragEnd() {
    this.draggedTask = null!;
  }
}
