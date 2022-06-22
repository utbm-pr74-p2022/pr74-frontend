import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<User, number> {
  constructor(protected http: HttpClient) {
    super(http, `user`);
  }
}
