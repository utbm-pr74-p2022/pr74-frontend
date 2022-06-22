import { Backlog } from "./backlog.model";
import { Priority } from "./priority.model";
import { Sprint } from "./sprint.model";
import { Status } from "./status.model";
import { User } from "./user.model";

export class Task {
  id: number | null;
  name: string;
  description: string | null;
  priority: Priority;
  user: User | null;
  backlog: Backlog | null;
  sprint: Sprint | null;
  status: Status | null;

  constructor(id: number | null, name: string, description: string | null, priority: Priority, user: User | null,
            backlog: Backlog | null, sprint: Sprint| null, status: Status | null) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.user = user;
    this.backlog = backlog;
    this.sprint = sprint;
    this.status = status;
  }
}
