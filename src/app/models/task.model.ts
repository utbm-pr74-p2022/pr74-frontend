export class Task {
  id: number;
  name: string;
  idCondition: number;
  idsAssigned: number[];

  constructor(id: number, name: string, idCondition: number, idsAssigned: number[]) {
    this.id = id;
    this.name = name;
    this.idCondition = idCondition;
    this.idsAssigned = idsAssigned;
  }
}
