import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from '../../../auth.service';
import {ApiService} from '../../../api.service';

@Component({
  selector: 'app-lista-carrito',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [ApiService], // Proveedor ApiService
  templateUrl: './lista-carrito.component.html',
  styleUrls: ['./lista-carrito.component.css']
})
export class ListaCarritoComponent implements OnInit {
  listaCarrito: any[] = [];
  totalCarrito: number = 0;

  constructor(private authService: AuthService, private apiService: ApiService) {
  }

  ngOnInit() {
    console.log('Página cargada exitosamente');
    console.log(this.listaCarrito);
    this.getListaCarrito();
  }

  getListaCarrito() {
    this.apiService.get<any[]>(`mi_carrito/${this.authService.id}`).subscribe(
      data => {
        this.listaCarrito = data;
        console.log(this.listaCarrito);

        // calcular el total del carrito después de que los datos se hayan cargado
        this.totalCarrito = this.listaCarrito.reduce((acumulador, item) => {
          return acumulador + parseFloat(item.total); // nos aseguramos de que item.total sea un número
        }, 0);

        console.log('Total del carrito:', this.totalCarrito);
      },
      error => {
        console.error(error);
      }
    );
  }

  postRealizarPedido() {
    this.apiService.post('pedidos', {id: this.authService.id}).subscribe(
      data => {
        console.log(data);
        window.location.href = '/carrito';
      },
      error => {
        console.error(error);
      }
    );
  }
}
