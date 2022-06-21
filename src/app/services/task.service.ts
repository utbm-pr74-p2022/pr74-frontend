import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService extends CrudService<Task, number> {

  constructor(protected http: HttpClient) {
    super(http, `task`);
  }
}
