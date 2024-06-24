import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private readonly http: HttpClient) { }

  /**
   * Servicio para realizar el login
   * @param user Usuario a loggear
   * @param password Contraseña del usuario
   * @returns Token de autenticación
   */
  login(user: string, password: string): Observable<Login> {
    return this.http.post<Login>('http://localhost:3000/api/user/login', { user, password });
  }
}
