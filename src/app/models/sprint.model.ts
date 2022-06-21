import { Project } from "./project.model";

export class Sprint {
  id?: number | null;
  name?: string;
  description?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  status?:string | null;
  project?: Project | null;

  constructor(id?: number | null, name?: string, description?: string | null, startDate?: string | null,
            endDate?: string | null, status?:string | null, project?: Project | null) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
    this.project = project;
  }
}
