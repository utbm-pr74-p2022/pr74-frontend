import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class MenuService {
<<<<<<< HEAD
  private selectedProject = new Subject<Project>();

  setSelectedProject(selectedProject: Project){
    this.selectedProject.next(selectedProject);
  }

  getSelectedProject(){
    return this.selectedProject.asObservable();
  }

=======
>>>>>>> d183455594b4c0620f42f2ac776a88d90ba2655a
}
