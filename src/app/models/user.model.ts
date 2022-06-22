export class User {
  id: number;
  username: string;
  role: string | null;

  constructor(id: number, username: string, role: string | null) {
    this.id = id;
    this.username = username;
    this.role = role;
  }
}
