import {Component, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApiService} from '../../../api.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  providers: [ApiService], // Proveedor ApiService
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private apiService: ApiService, private router: Router) {
  }

  // objeto para almacenar los datos del usuario
  usuario = {
    nombreUsuario: '',
    correo: '',
    contrasena: '',
    telefono: '',
    direccion: ''
  };

  // Metodo para manejar el envío del formulario
  GuardarUsuario() {
    if (!this.usuario.nombreUsuario || !this.usuario.correo || !this.usuario.contrasena || !this.usuario.telefono || !this.usuario.direccion) {
      alert('Faltan campos por ingresar');
    } else {
      console.log(this.usuario); // Muestra los datos del formulario
      this.postCrearUsuario();
    }
  }

  postCrearUsuario() {
    this.apiService.post('usuarios', this.usuario)
      .subscribe(
        data => {
          console.log(data);
          window.location.href='/login';
        }, error => {
          console.log(error);
          alert(error)
        }
      )
  }
}
