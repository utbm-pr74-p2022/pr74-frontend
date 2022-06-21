import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sprint } from '../models/sprint.model';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class SprintService extends CrudService<Sprint, number> {
  constructor(protected http: HttpClient) {
    super(http, `sprint`);
  }
}
