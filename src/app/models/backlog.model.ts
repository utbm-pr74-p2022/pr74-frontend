import { Task } from "./task.model";

export class Backlog {
  id: number;
  tasks: Task[];

  constructor(id: number, tasks: Task[]) {
    this.id = id;
    this.tasks = tasks;
  }
}
