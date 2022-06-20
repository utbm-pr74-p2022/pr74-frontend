import { Sprint } from "./sprint.model";
import { User } from "./user.model";

export class Project {
  id?: number | null;
  name?: string;
  createdDate?: string | null;
  status?:string | null;

  constructor(id: number | null, name: string, createdDate: string | null, status: string | null) {
    this.id = id;
    this.name = name;
    this.createdDate = createdDate;
    this.status = status;
  }
}
