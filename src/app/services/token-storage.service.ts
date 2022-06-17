import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const PROJECT_KEY = 'auth-project';

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {
  signOut(): void {
      window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
      window.sessionStorage.removeItem(TOKEN_KEY);
      window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
      return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
      window.sessionStorage.removeItem(USER_KEY);
      window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
      const user = window.sessionStorage.getItem(USER_KEY);
      if (user) {
          return JSON.parse(user);
      }

      return {};
  }

  public saveProject(project: any): void {
    window.sessionStorage.removeItem(PROJECT_KEY);
    window.sessionStorage.setItem(PROJECT_KEY, JSON.stringify(project));
  }

  public getProject(): any {
    const project = window.sessionStorage.getItem(PROJECT_KEY);
    if (project) {
        return JSON.parse(project);
    }

    return {};
  }
}
