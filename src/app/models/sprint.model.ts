import { Project } from "./project.model";

export class Sprint {
  id?: number | null;
  name?: string;
  description?: string;
  startDate?: string | null;
  endDate?: string | null;
  status?:string | null;
  project?: Project;

  constructor(id?: number | null, name?: string, description?: string, startDate?: string | null,
            endDate?: string | null, status?:string | null, project?: Project) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.status = status;
    this.project = project;
  }
}
