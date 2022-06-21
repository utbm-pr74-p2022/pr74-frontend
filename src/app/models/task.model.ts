import { Backlog } from "./backlog.model";
import { Priority } from "./priority.model";
import { Sprint } from "./sprint.model";
import { Status } from "./status.model";

export class Task {
  id: number | null;
  name: string;
  priority: Priority;
  idsAssigned: number[] | null;
  backlog: Backlog | null;
  sprint: Sprint | null;
  status: Status | null;

  constructor(id: number | null, name: string, priority: Priority, idsAssigned: number[] | null,
            backlog: Backlog | null, sprint: Sprint| null, status: Status | null) {
    this.id = id;
    this.name = name;
    this.priority = priority;
    this.idsAssigned = idsAssigned;
    this.backlog = backlog;
    this.sprint = sprint;
    this.status = status;
  }
}
