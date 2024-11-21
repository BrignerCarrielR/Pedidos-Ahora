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
  cantidadPedidos: number = 0;
  tarifa: number = 0
  subtotal: number = 0;

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
        this.totalCarrito = parseFloat(
          this.listaCarrito.reduce((acumulador, item) => {
            return acumulador + parseFloat(item.total); // aseguramos que item.total sea un número
          }, 0).toFixed(2)
        );
        this.cantidadPedidos = this.listaCarrito.reduce((acumulador, item) => {
          return acumulador + parseInt(item.cantidad); // nos aseguramos de que item.total sea un número
        }, 0);

        this.tarifa = parseFloat((this.totalCarrito * 0.1).toFixed(2));
        this.subtotal = parseFloat((this.totalCarrito + this.tarifa).toFixed(2));
        console.log('Total del carrito:', this.totalCarrito);
        console.log('Cantidad de elementos en el  carrito:', this.cantidadPedidos);
        console.log('Tarifa:', this.tarifa);

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
