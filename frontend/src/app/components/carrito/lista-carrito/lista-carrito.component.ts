import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AuthService} from '../../../auth.service';
import {ApiService} from '../../../api.service';

interface Temporada {
  estado: boolean;
  id: number;
  nombre: string;
  tarifa: string;
}

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
  tarifaActiva: number = 0;

  constructor(private authService: AuthService, private apiService: ApiService) {
    this.gettemporada()
  }

  ngOnInit() {
    console.log('Página cargada exitosamente');
    console.log(this.listaCarrito);
    this.getListaCarrito();
  }

  gettemporada() {
    this.apiService.get<Temporada[]>('temporadas').subscribe(
      (data) => {  // Ahora 'data' será inferido como un array de 'Temporada'
        console.log(data); // Para ver la estructura de los datos

        // Filtrar la temporada que tenga el estado en 'true'
        const temporadaActiva = data.find(temporada => temporada.estado === true);

        if (temporadaActiva) {
          console.log('Tarifa de la temporada activa:', parseFloat(temporadaActiva.tarifa));
          this.tarifaActiva = parseFloat(temporadaActiva.tarifa) / 100
          console.log(this.tarifaActiva);
        } else {
          console.log('No se encontró una temporada con estado activo.');
          alert('No hay temporada activa.');
        }
      },
      error => {
        console.error('Error al obtener las temporadas:', error);
        alert('Hubo un error al obtener las temporadas.');
      }
    );
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

        this.tarifa = parseFloat((this.totalCarrito * this.tarifaActiva).toFixed(2));
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
        window.location.reload();
      },
      error => {
        console.error(error);
      }
    );
  }

  postFavorito(id: number) {
    console.log(id, this.authService.id);
    this.apiService.post('favoritos', {id_usuario: this.authService.id, id_plato: id}).subscribe(
      data => {
        console.log(data);
        alert('El menú se agregó a favoritos')
      },
      error => {
        console.error(error);
      }
    );
  }

  deleteMenuCarrito(id: number) {
    console.log(id)
    this.apiService.delete<{ message: string }>(`eliminar_nenu_pedido/${id}`).subscribe(
      data => {
        console.log(data.message);
        alert(data.message)
        window.location.reload();
      },
      error => {
        console.error(error);
      }
    );
  }
}
