import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Project } from "../models/project.model";

@Injectable({
  providedIn: "root",
})
export class MenuService {
  private selectedProject = new Subject<string>();

  setSelectedProject(selectedProject: string){
    this.selectedProject.next(selectedProject);
  }

  getSelectedProject(){
    return this.selectedProject.asObservable();
  }

}
