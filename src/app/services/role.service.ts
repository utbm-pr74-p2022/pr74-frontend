import { Injectable } from '@angular/core';
import { Role } from '../models/role.model';
import { User } from '../models/user.model';

const ROLE_SCRUM_MASTER = "Scrum master";
const ROLE_PRODUCT_OWNER = "Product owner";
const ROLE_TEAM = "Team";

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  roles: Role[] = [new Role(1, "ROLE_SCRUM_MASTER", ROLE_SCRUM_MASTER), new Role(2, "ROLE_PRODUCT_OWNER", ROLE_PRODUCT_OWNER),
    new Role(3, "ROLE_TEAM", ROLE_TEAM)];

  getRole(user: User) {
    const role = user.role as Role;
    if(role.name == 'ROLE_PRODUCT_OWNER')
    {
      return ROLE_PRODUCT_OWNER;
    }
    else if(role.name == 'ROLE_SCRUM_MASTER')
    {
      return ROLE_SCRUM_MASTER;
    }
    if(role.name == 'ROLE_TEAM')
    {
      return ROLE_TEAM;
    }
    return "";
  }

  getAllRoles() {
    return this.roles;
  }
}
