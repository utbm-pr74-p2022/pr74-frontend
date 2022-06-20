import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Sprint } from '../models/sprint.model';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class BacklogService {

    status: string[] = ['CLOSE', 'OPEN', 'PROGRESS'];

    sprintTitles: string[] = [
        "Bamboo Watch",
        "Black Watch",
    ];

    constructor(private http: HttpClient) { }

    getSprints() {
        return this.http.get<any>('assets/sprints.json')
        .toPromise()
        .then(res => <Sprint[]>res.data)
        .then(data => { return data; });
    }


    generateSprint(): Sprint {
      const sprint: Sprint =  {
          id: this.generateId(),
          sprintNo: "SPR00001",
          name: this.generateTitle(),
          dateFrom: new Date(),
          dateTo: new Date(),
          status: this.generateStatus()
      };

      return sprint;
  }

    generateId() {
      return Math.floor(Math.random() * Math.floor(299)+1);
    }

    generateTitle() {
        return this.sprintTitles[Math.floor(Math.random() * Math.floor(30))];
    }

    generateStatus() {
        return this.status[Math.floor(Math.random() * Math.floor(3))];
    }
}
