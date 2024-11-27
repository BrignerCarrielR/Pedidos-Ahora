import {Component} from '@angular/core';
import {MiPerfilComponent} from '../mi-perfil/mi-perfil.component';
import {NgForOf, NgIf} from '@angular/common';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from '../../../auth.service';
import {ApiService} from '../../../api.service';
import {data} from 'autoprefixer';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [CommonModule, HttpClientModule,
    MiPerfilComponent,
    NgForOf,
    NgIf
  ],
  providers: [ApiService],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export class FavoritosComponent {
  listaFavoritos: any[] = []

  constructor(private authService: AuthService, private apiService: ApiService) {
    this.getListaFavoritos()
  }

  getListaFavoritos(): void {
    this.apiService.get<any[]>(`favoritos/${this.authService.id}`).subscribe(
      data => {
        this.listaFavoritos = data;
        console.log(this.listaFavoritos)
      }, error => {
        console.error(error);
      }
    )
  }

  deleteFavorito(id: number) {
    console.log(id)
    this.apiService.delete<{ message: string }>(`favoritos/${id}`).subscribe(
      data => {
        console.log(data.message)
        alert(data.message)
        window.location.reload();
      }, error => {
        console.log(error);
      }
    )
  }

  postCarrito(favorito: any) {
    console.log(favorito)
    const {id_usuario, id_plato} = favorito;
    console.log(id_usuario, id_plato)
    this.apiService.post<{ message: string }>(`agregar_pedido_carrito`, {id_usuario, id_comida: id_plato, cantidad: 1}).subscribe(
      data => {
        console.log(data.message);
        alert(data.message)
      }, error => {
        console.error(error)
      }
    )
  }
}
