import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

    tasksTitles: string[] = [
        "Me Watch",
        "Black Watch",
    ];

    constructor(private http: HttpClient) { }

    getTasks() {
        return this.http.get<any>('assets/tasks.json')
        .toPromise()
        .then(res => <Task[]>res.data)
        .then(data => { return data; });
    }


    generateTask(): Task {
      return new Task(this.generateId(), this.generateTitle(), 0, []);
  }

    generateId() {
      return Math.floor(Math.random() * Math.floor(299)+1);
    }

    generateTitle() {
        return this.tasksTitles[Math.floor(Math.random() * Math.floor(30))];
    }
}
