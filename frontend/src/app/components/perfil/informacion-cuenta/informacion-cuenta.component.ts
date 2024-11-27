import {Component} from '@angular/core';
import {MiPerfilComponent} from '../mi-perfil/mi-perfil.component';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ApiService} from '../../../api.service';
import {AuthService} from '../../../auth.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-informacion-cuenta',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MiPerfilComponent, FormsModule],
  providers: [ApiService],
  templateUrl: './informacion-cuenta.component.html',
  styleUrl: './informacion-cuenta.component.css'
})
export class InformacionCuentaComponent {
  usuario = {
    usuario: '',
    direccion: '',
    correo: ''
  }

  constructor(private authService: AuthService, private apiService: ApiService) {
    this.getUsuarios()
  }
  getUsuarios() {
    this.apiService.get<{
      usuario: string,
      direccion: string,
      correo: string
    }>(`usuarios/${this.authService.id}`).subscribe(
      data => {
        this.usuario.usuario = data.usuario
        this.usuario.direccion = data.direccion
        this.usuario.correo = data.correo
        console.log(this.usuario)
      }, error => {
        console.log(error);
      }
    )
  }
  EditarUsuaio (){
    console.log(this.usuario)
    this.putUsuario()
  }

  putUsuario() {
    this.apiService.put<{message:string}>(`usuario/${this.authService.id}`, this.usuario).subscribe(
      data => {
        console.log(data.message)
        alert(data.message)
        window.location.reload()
      }, error => {
        console.log(error);
      }
    )
  }

}
