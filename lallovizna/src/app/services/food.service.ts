import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Food } from '../interfaces/food';
import { BackInfo } from '../interfaces/back-info';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private readonly http: HttpClient) { }

  /**
   * Servicio para obtener la lista de las comidas disponibles
   * @returns Comidas disponibles
   */
  getFoods(): Observable<Food[]> {
    return this.http.get<Food[]>('http://localhost:3000/api/food');
  }

  getFoodsByCategory(category:string): Observable<Food[]> {
    return this.http.get<Food[]>('http://localhost:3000/api/food/'+ category);
  }

  

  /**
   * Servicio para guardar una nueva comida o actualizar una existente
   * @param food Comida a guardar
   * @returns Mensaje de aceptación
   */
  saveFood(food: Food): Observable<BackInfo> {
    const headers:HttpHeaders = new HttpHeaders ({
      Authorization: sessionStorage.getItem ('token')!
    })
    return this.http.post<BackInfo>('http://localhost:3000/api/food', food, {headers:headers});
  }

  /**
   * Servicio para eliminar una comida
   * @param id Identificador de la comida a eliminar
   * @returns Mensaje de aceptación
   */
  deleteFood(id: string): Observable<BackInfo> {
    const headers:HttpHeaders = new HttpHeaders ({
      Authorization: sessionStorage.getItem ('token')!
    })
    return this.http.delete<BackInfo>(`http://localhost:3000/api/food/${id}`, {headers:headers});
  }
}
