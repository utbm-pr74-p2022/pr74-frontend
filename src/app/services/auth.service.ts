import { Injectable } from "@angular/core";
import { BehaviorSubject, delay, Observable, of, tap } from "rxjs";
import { User } from "../models/user.model";
import { JwtHelperService } from '@auth0/angular-jwt'
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TokenStorageService } from "./token-storage.service";
import { ProjectService } from "./project.service";
import { Project } from "../models/project.model";


const AUTH_API = 'http://localhost:9000/login/';
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

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService, private projectService: ProjectService) {
    this.currentUserSubject = new BehaviorSubject<User>({} as User);
    this.currentUser = this.currentUserSubject.asObservable();
    this.jwtHelper = new JwtHelperService();
    if (this.isAuthenticated()) {
      this.currentUserSubject.next(tokenStorage.getUser());
    }
  }

  login(username: string, password: string){
    return new Promise<void>(
      (resolve, reject) => {
        this.http.post(AUTH_API, { username: username, password: password }, httpOptions).subscribe(
          data => {
            this.loginUser(data);
            resolve();
          },
          error => {
            reject(error);
          }
        )
      }
    );
  }

  logout(){
    this.isLoggedIn = false;
    this.currentUserSubject.next({} as User);
    this.projectService.setSelectedProject({} as Project);
    this.tokenStorage.signOut();
  }

  loginUser(data: any) {
    let user = new User(data.username, data.role);
    this.tokenStorage.saveToken(data.token);
    this.tokenStorage.saveUser(user);
    this.currentUserSubject.next(user);
  }

  public isAuthenticated(): boolean {
    let token = this.tokenStorage.getToken();
    return !this.jwtHelper.isTokenExpired(token!);
  }

  getToken(): string | null {
    return this.tokenStorage.getToken();
  }
}
