import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Condition } from '../models/condition.model';
import { Task } from '../models/task.model';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class ConditionService extends CrudService<Condition, number> {
  conditions: Condition[] = [new Condition(1, "A faire"), new Condition(2, "En cours"), new Condition(3, "Terminé")];

  constructor(protected http: HttpClient) {
    super(http, `conditions`);
  }

  getConditions() {
    return this.conditions;
  }
}
