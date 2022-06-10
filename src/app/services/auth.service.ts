import { Injectable } from "@angular/core";
import { BehaviorSubject, delay, Observable, of, tap } from "rxjs";
import { User } from "../models/user.model";
import { JwtHelperService } from '@auth0/angular-jwt'
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TokenStorageService } from "./token-storage.service";


const AUTH_API = 'http://localhost:8080/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private jwtHelper: JwtHelperService;

  isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    this.currentUserSubject = new BehaviorSubject<User>(null!);
    this.currentUser = this.currentUserSubject.asObservable();
    this.jwtHelper = new JwtHelperService();
    if (this.isAuthenticated()) {
      this.currentUserSubject.next(tokenStorage.getUser());
    }
  }

  login(username: string, password: string): Observable<boolean>{
    const isLoggedIn = (username == 'test' && password == 'test');

    return of(isLoggedIn).pipe(
      delay(1000),
      tap(isLoggedIn => {
        this.isLoggedIn = isLoggedIn
        this.loginUser({email:username, firstName: username, lastName:username, roles: ['Scrum Master']});
      })
    );

    /*return new Promise<void>(
      (resolve, reject) => {
        this.http.post(AUTH_API + "signin", { username: email, password: password }, httpOptions).subscribe(
          data => {
            this.loginUser(data);
            resolve();
          },
          error => {
            reject(error);
          }
        )
      }
    );*/
  }

  logout(){
    this.isLoggedIn = false;
    this.currentUserSubject.next(null!);
    this.tokenStorage.signOut();
  }

  loginUser(data: any) {
    let user = new User(data.email, data.firstName, data.lastName, data.roles);
    //this.tokenStorage.saveToken(data.accessToken);
    this.tokenStorage.saveUser(user);
    this.currentUserSubject.next(user);
  }

  public isAuthenticated(): boolean {
    //let token = this.tokenStorage.getToken();
    //return !this.jwtHelper.isTokenExpired(token!);
    let user = this.tokenStorage.getUser();
    return user;
  }

  getToken(): string | null {
    return this.tokenStorage.getToken();
  }
}
