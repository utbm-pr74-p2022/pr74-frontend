import { Component } from '@angular/core';
import { Condition } from '../models/condition.model';
import { Task } from '../models/task.model';
import { ConditionService } from '../services/condition.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  conditions: Condition[];

  tasks: Task[] = [];

  draggedTask!: Task;

  constructor(private taskService: TaskService, private conditionService: ConditionService) {
    this.conditions = this.conditionService.getConditions();
    //this.tasks = this.taskService.getAllTasks();
  }

  dragStart(task: Task) {
      this.draggedTask = task;
  }

  drop(id: number) {
      if (this.draggedTask) {
        this.draggedTask.idCondition = id;
       // this.taskService.updateTask(this.draggedTask);
        this.draggedTask = null!;
      }
  }

  dragEnd() {
      this.draggedTask = null!;
  }
}
