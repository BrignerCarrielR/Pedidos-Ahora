import { Injectable } from '@angular/core';
// auth.service.ts
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _login: boolean = false;
  private _token: string | null = null;
  private _idUser: number | null = null;  // Initialize with null
  private _nombreUser: string | null = null;
  constructor() {
    this._token = localStorage.getItem('auth_token');
    this._idUser = localStorage.getItem('user_id') ? parseInt(localStorage.getItem('user_id')!, 10) : null; // Recupera el idUser de localStorage
    this._login = this._token !== null;
    this._nombreUser = localStorage.getItem('nombre_usuario');
  }





  get isLoggedIn(): boolean {
    return this._login;
  }

  get token(): string | null {
    return this._token;
  }
  get id(): number | null{
    return this._idUser
  }

  get nombreUser(): string| null {
    return this._nombreUser;
  }

  loginUser(token: string, id: number, nombre : string): void {
    this._token = token;
    this._idUser = id;
    this._nombreUser = nombre;
    this._login = true;
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_id', id.toString());  // Guarda el idUser en localStorage
    localStorage.setItem('nombre_usuario', nombre);  // Guarda el idUser en localStorage
    console.log("Iniciando sesión");
  }


  logoutUser(): void {
    this._token = null;
    this._idUser = null;  // También limpias el idUser
    this._login = false;
    this._nombreUser = '';
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_id');  // Elimina el idUser de localStorage
    localStorage.removeItem('nombre_usuario');  // Elimina el idUser de localStorage
    console.log("Cerrando sesión");
  }

}

