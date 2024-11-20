import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service'; // Asegúrate de importar AuthService

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = 'http://localhost:3000/';  // URL base de todas las APIs

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Método para construir los encabezados con el token de autorización
  private getHeaders(): HttpHeaders {
    const token = this.authService.token;  // Obtener el token desde AuthService
    if (token) {
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
    } else {
      return new HttpHeaders();  // Si no hay token, no se agrega autorización
    }
  }

  // Método GET para obtener listas o un solo elemento (id opcional)
  get<T>(url: string, id?: number): Observable<T> {
    const endpoint = id ? `${url}/${id}` : url;
    return this.http.get<T>(`${this.baseUrl}${endpoint}`, { headers: this.getHeaders() });
  }

  // Método POST para crear nuevos registros
  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${endpoint}`, body, { headers: this.getHeaders() })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Método PUT para actualizar los registros
  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${endpoint}`, body, { headers: this.getHeaders() });
  }

  // Manejo de errores HTTP
  private handleError(error: any): Observable<never> {
    let errorMessage = 'Ha ocurrido un error desconocido';

    if (error.error && error.error.message) {
      errorMessage = error.error.message;
    } else if (error.status === 0) {
      errorMessage = 'No se puede conectar con el servidor';
    } else if (error.status >= 400 && error.status < 500) {
      errorMessage = `Error de cliente: ${error.message}`;
    } else if (error.status >= 500) {
      errorMessage = 'Error en el servidor, por favor inténtalo más tarde';
    }

    console.error('Error: ', error);
    return throwError(() => new Error(errorMessage));  // Asegúrate de devolver un Observable con un error
  }
}


