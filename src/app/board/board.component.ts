import { Component } from '@angular/core';
import { Condition } from '../models/condition.model';
import { Task } from '../models/task.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  conditions: Condition[] = [new Condition(1, "A faire"), new Condition(2, "En cours"), new Condition(3, "Terminé")];

  tasks: Task[] = [new Task(1, "create project", 1, [1, 5]), new Task(2, "create menu", 1, [2, 3, 9, 12]), new Task(3, "implement board", 1, [1, 7, 5]), new Task(4, "create task", 1, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])];

  draggedTask: Task | undefined;

  dragStart(task: Task) {
      this.draggedTask = task;
  }

  drop(id: number) {
      if (this.draggedTask) {
        this.draggedTask.idCondition = id;
        this.draggedTask = undefined;
      }
  }

  dragEnd() {
      this.draggedTask = undefined;
  }
}
