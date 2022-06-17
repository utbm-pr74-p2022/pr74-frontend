export class User {
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];

  constructor(email: string, firstName: string, lastName: string, roles: string[]) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.roles = roles;
  }
}
