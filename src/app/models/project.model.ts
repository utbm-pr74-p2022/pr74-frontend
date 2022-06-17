export class Project {
  id?: number;
  projectNo?: string;
  title?: string;
  createdDate?: Date;
  status?:string;

  constructor(id: number, projectNo: string, title: string, createdDate: Date, status: string) {
    this.id = id;
    this.projectNo = projectNo;
    this.title = title;
    this.createdDate = createdDate;
    this.status = status;
  }
}
