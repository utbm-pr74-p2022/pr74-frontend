import { Backlog } from "./backlog.model";
import { Priority } from "./priority.model";
import { Sprint } from "./sprint.model";

export class Task {
  id: number | null;
  name: string;
  priority: Priority;
  idCondition: number | null;
  idsAssigned: number[] | null;
  backlog: Backlog | null;
  sprint: Sprint | null;

  constructor(id: number | null, name: string, priority: Priority, idCondition: number | null, idsAssigned: number[] | null,
            backlog: Backlog | null, sprint: Sprint| null) {
    this.id = id;
    this.name = name;
    this.priority = priority;
    this.idCondition = idCondition;
    this.idsAssigned = idsAssigned;
    this.backlog = backlog;
    this.sprint = sprint;
  }
}
