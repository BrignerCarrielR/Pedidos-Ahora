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
  private _es_staff: boolean = false;
  constructor() {
    this._token = localStorage.getItem('auth_token');
    this._idUser = localStorage.getItem('user_id') ? parseInt(localStorage.getItem('user_id')!, 10) : null; // Recupera el idUser de localStorage
    this._login = this._token !== null;
    this._nombreUser = localStorage.getItem('nombre_usuario');

    const staff = localStorage.getItem('staff');
    this._es_staff = staff === 'true';
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

  get es_staff(): boolean {
    return this._es_staff;
  }

  loginUser(token: string, id: number, nombre : string, es_staff:boolean): void {
    this._token = token;
    this._idUser = id;
    this._nombreUser = nombre;
    this._login = true;
    this._es_staff = es_staff;
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_id', id.toString());
    localStorage.setItem('nombre_usuario', nombre);
    localStorage.setItem('staff', es_staff.toString());

    console.log("Iniciando sesión");
  }


  logoutUser(): void {
    this._token = null;
    this._idUser = null;  // También limpias el idUser
    this._login = false;
    this._nombreUser = '';
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('nombre_usuario');
    localStorage.removeItem('staff'),
    console.log("Cerrando sesión");
  }

}

