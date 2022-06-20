import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Project } from '../models/project.model';
import { CrudService } from './crud.service';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends CrudService<Project, number> {

  private currentProjectSubject: BehaviorSubject<Project>;
  public currentProject: Observable<Project>;
  status: string[] = ['CLOSE', 'OPEN', 'PROGRESS'];

  projectTitles: string[] = [
      "Bamboo Watch",
      "Black Watch",
  ];

  constructor(protected http: HttpClient, private tokenStorage: TokenStorageService) {
    super(http, `project`);
    this.currentProjectSubject = new BehaviorSubject<Project>(null!);
    this.currentProject = this.currentProjectSubject.asObservable();
    if (this.isSelected()) {
      this.currentProjectSubject.next(tokenStorage.getProject());
    }
  }

  // getProductsSmall() {
  //     return this.http.get<any>('assets/products-small.json')
  //     .toPromise()
  //     .then(res => <Product[]>res.data)
  //     .then(data => { return data; });
  // }


  setSelectedProject(selectedProject: Project){
    this.tokenStorage.saveProject(selectedProject);
    this.currentProjectSubject.next(selectedProject);
  }

  public isSelected(): boolean {
    let project = this.tokenStorage.getProject();
    return project;
  }
}
