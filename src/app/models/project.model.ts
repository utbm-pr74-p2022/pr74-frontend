import { User } from "./user.model";

export class Project {
  id?: number | null;
  name?: string;
  date?: string | null;
  status?:string | null;
  users: User[] | null;

  constructor(id: number | null, name: string, date: string | null, status: string | null, users: User[] | null) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.status = status;
    this.users = users;
  }
}
