export class Role {
  id: number;
  name: string;
  nameFront: string | null;

  constructor(id: number, name: string, nameFront: string | null)
  {
    this.id = id;
    this.name = name;
    this.nameFront = nameFront;
  }
}
