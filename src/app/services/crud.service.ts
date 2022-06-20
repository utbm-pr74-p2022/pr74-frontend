import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_URL = 'http://localhost:9000/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
export abstract class CrudService<T, ID> {

  constructor(protected _http: HttpClient, protected _base: string) {}

  save(t: T): Observable<T> {
    return this._http.post<T>(API_URL + this._base, t, httpOptions);
  }

  update(id: ID, t: T): Observable<T> {
    return this._http.put<T>(API_URL + this._base + "/" + id, t, httpOptions);
  }

  findOne(id: ID): Observable<T> {
    return this._http.get<T>(API_URL + this._base + "/" + id);
  }

  getAll(): Observable<T[]> {
    return this._http.get<T[]>(API_URL + this._base, httpOptions)
  }

  delete(id: ID): Observable<T> {
    return this._http.delete<T>(API_URL + this._base + '/' + id);
  }

}
