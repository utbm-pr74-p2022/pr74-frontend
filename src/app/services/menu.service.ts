import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Project } from "../models/project.model";

@Injectable({
  providedIn: "root",
})
export class MenuService {
  private selectedProject = new Subject<Project>();

  setSelectedProject(selectedProject: Project){
    this.selectedProject.next(selectedProject);
  }

  getSelectedProject(){
    return this.selectedProject.asObservable();
  }

}
