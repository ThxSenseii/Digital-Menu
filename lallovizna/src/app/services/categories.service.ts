import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../interfaces/category';
import { BackInfo } from '../interfaces/back-info';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private readonly http: HttpClient) { }

  /**
   * Servicio para obtener la lista de categorías disponibles
   * @returns Categorías
   */
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>('http://localhost:3000/api/category');
  }

  /**
   * Servicio para crear una nueva categoría
   * @param category Nombre de la categoría a crear
   * @returns Mensaje de aceptación
   */
  createCategory(category: string): Observable<BackInfo> {
    return this.http.post<BackInfo>('http://localhost:3000/api/category', { name: category });
  }

  /**
   * Servicio para eliminar una categoría
   * @param category Id de la categoría a eliminar
   * @returns Mensaje de aceptación
   */
  deleteCategory(category: string): Observable<BackInfo> {
    return this.http.delete<BackInfo>(`http://localhost:3000/api/category/${category}`);
  }
}
