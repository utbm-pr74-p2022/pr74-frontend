import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
<<<<<<< HEAD

=======
import { CrudService } from './crud.service';
>>>>>>> d183455594b4c0620f42f2ac776a88d90ba2655a

@Injectable({
  providedIn: 'root'
})
<<<<<<< HEAD
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
=======
export class TaskService extends CrudService<Task, number> {
  tasks: Task[] = [new Task(1, "create project", 1, [1, 5]), new Task(2, "create menu", 1, [2, 3, 9, 12]), new Task(3, "implement board", 1, [1, 7, 5]),
                  new Task(4, "create task", 1, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])];

  constructor(protected http: HttpClient) {
    super(http, `tasks`);
  }

  getTasks() {
    return this.tasks;
  }

  updateTask(task: Task) {
    this.tasks.forEach(t => {
      if (t.id === task.id) {
        t.idCondition = task.idCondition;
      }
    });
  }
>>>>>>> d183455594b4c0620f42f2ac776a88d90ba2655a
}
