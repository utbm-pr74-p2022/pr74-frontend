import { Priority } from "./priority.model";

export class Task {
  id: number;
  name: string;
  priority: Priority;
  idCondition: number;
  idsAssigned: number[];

  constructor(id: number, name: string, priority: Priority, idCondition: number, idsAssigned: number[]) {
    this.id = id;
    this.name = name;
    this.priority = priority;
    this.idCondition = idCondition;
    this.idsAssigned = idsAssigned;
  }
}
