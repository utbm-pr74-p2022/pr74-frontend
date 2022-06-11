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
    super(http, `projects`);
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

  getProjects() {
      return this.http.get<any>('assets/projects.json')
      .toPromise()
      .then(res => <Project[]>res.data)
      .then(data => { return data; });
  }

  // getProductsWithOrdersSmall() {
  //     return this.http.get<any>('assets/products-orders-small.json')
  //     .toPromise()
  //     .then(res => <Product[]>res.data)
  //     .then(data => { return data; });
  // }

  generateProject(): Project {
    const project: Project =  {
        id: this.generateId(),
        projectNo: "PRO00001",
        title: this.generateTitle(),
        createdDate: new Date(),
        status: this.generateStatus()
    };

    return project;
}

  generateId() {
    return Math.floor(Math.random() * Math.floor(299)+1);
  }

  generateTitle() {
      return this.projectTitles[Math.floor(Math.random() * Math.floor(30))];
  }

  generateStatus() {
      return this.status[Math.floor(Math.random() * Math.floor(3))];
  }
}
