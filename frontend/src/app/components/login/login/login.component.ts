import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApiService} from '../../../api.service';
import {AuthService} from '../../../auth.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  providers: [ApiService], // Proveedor ApiService
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private authService: AuthService, private apiService: ApiService, private router: Router) {
  }

  // objeto para enviar al login
  dataLogin = {
    nombreUsuario: '',
    contrasena: ''
  }


  login() {
    this.apiService.post('login', this.dataLogin)
      .subscribe(
        (response: any) => {
          // Cuando obtienes el token de la respuesta, lo guardas
          this.authService.loginUser(response.token, response.id, response.nombreUsuario);
          console.log('Login exitoso');
          if (response.nombreUsuario === 'bcarrielr') {
            window.location.href = '/administrador/pedidos'
          } else {
            window.location.href = '/'
          }
        },
        error => {
          console.error('Error al iniciar sesión:', error);
          alert('La credenciales no coinciden')
        }
      );
  }

}
