import { Role } from "./role.model";

export class User {
  id: number | null;
  username: string;
  password: string;
  role: string | Role | null;
  image: string | null;

  constructor(id: number | null, username: string, password: string, role: string | Role | null, image: string | null) {
    this.id = id;
    this.username = username;
    this.role = role;
    this.image = image;
    this.password = password;
  }
}
