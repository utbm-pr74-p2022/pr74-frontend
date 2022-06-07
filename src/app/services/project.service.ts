import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

    status: string[] = ['CLOSE', 'OPEN', 'PROGRESS'];

    projectTitles: string[] = [
        "Bamboo Watch",
        "Black Watch",
    ];

    constructor(private http: HttpClient) { }

    // getProductsSmall() {
    //     return this.http.get<any>('assets/products-small.json')
    //     .toPromise()
    //     .then(res => <Product[]>res.data)
    //     .then(data => { return data; });
    // }

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
