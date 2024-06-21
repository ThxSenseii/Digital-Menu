import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private readonly http: HttpClient) { }

  login(user: string, password: string) {
    return this.http.post('http://localhost:3000/api/user/login', { user, password });
  }
}
