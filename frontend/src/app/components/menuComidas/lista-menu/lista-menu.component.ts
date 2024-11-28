import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthService} from '../../../auth.service';
import {ApiService} from '../../../api.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-lista-menu',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  providers: [ApiService], // Proveedor ApiService
  templateUrl: './lista-menu.component.html',
  styleUrls: ['./lista-menu.component.css']
})
export class ListaMenuComponent implements OnInit {
  menuItems: any[] = [];
  MenuItemsFiltrado: any[] = [];
  login: boolean = false;
  buscarComida: string = '';
  tipoPlato: any[] = [];

  constructor(private authService: AuthService, private apiService: ApiService) {
    console.log('Es staff?: ', authService.es_staff);
  }

  ngOnInit(): void {
    console.log('Id obtenido desde el servicio:', this.authService.id);
    console.log('Estado del logueo:', this.authService.isLoggedIn);
    this.login = this.authService.isLoggedIn;
    console.log(this.menuItems)
    this.getMenuItems();
    this.getTipoMenuItems()
  }

  // evento pra filtrar los elmentos segun lo ingreado
  onInputChange() {
    this.MenuItemsFiltrado = this.menuItems.filter(menu =>
      menu.nombre_plato.toLowerCase().includes(this.buscarComida.toLowerCase())
    );
    console.log('Menú filtrado:', this.MenuItemsFiltrado);
  }

  // funcion para truncar la descripcion para que se muestre un maximo de 4 palabras
  truncateDescription(descripcion: string, limitePalabras: number = 4): string {
    const palabras = descripcion.split(' ');
    if (palabras.length > limitePalabras) {
      return palabras.slice(0, limitePalabras).join(' ') + '...';
    }
    return descripcion;
  }

  // obtenemos los elementos del menú de la API
  getMenuItems() {
    this.apiService.get<any[]>('menu_comida')
      .subscribe(
        data => {
          this.menuItems = data;
          this.MenuItemsFiltrado = data; // definimos la lista filtrada al iniciar con todos los elementos
        },
        error => {
          console.error(error);
        }
      );
  }

  getTipoMenuItems() {
    this.apiService.get<any[]>('tipo_comida')
      .subscribe(
        data => {
          this.tipoPlato = data;
          console.log(this.tipoPlato)
        },
        error => {
          console.error(error);
        }
      );
  }

  agregarAlCarrito(menu: any) {
    if (!menu.cantidad || menu.cantidad <= 0) {
      alert('Por favor, ingresa una cantidad válida.');
      return;
    }

    const pedido = {
      id_usuario: this.authService.id,
      id_comida: menu.id,
      cantidad: menu.cantidad
    };

    this.apiService.post('agregar_pedido_carrito', pedido).subscribe(
      data => {
        console.log('Pedido agregado al carrito:', data);
        alert('Pedido agregado al carrito');
      }, error => {
        console.error('Error al agregar al carrito:', error);
      }
    );
  }

  categoriaSeleccionada: string = this.tipoPlato[0];
  ordenSeleccionado: string = 'A-Z';

  // Añadir al componente ListaMenuComponent
  aplicarFiltros() {
    // filtrar por categoria
    let elementosFiltrados = this.menuItems;

    if (this.categoriaSeleccionada) {
      elementosFiltrados = this.menuItems.filter(item => item.tipo_comida_id === this.categoriaSeleccionada);
    }

    // filtrar por busqueda (buscarComida)
    if (this.buscarComida) {
      elementosFiltrados = elementosFiltrados.filter(item =>
        item.nombre_plato.toLowerCase().includes(this.buscarComida.toLowerCase())
      );
    }

    // ordenar por el criterio seleccionado
    if (this.ordenSeleccionado === 'A-Z') {
      elementosFiltrados = elementosFiltrados.sort((a, b) => a.nombre_plato.localeCompare(b.nombre_plato));
    } else if (this.ordenSeleccionado === 'Z-A') {
      elementosFiltrados = elementosFiltrados.sort((a, b) => b.nombre_plato.localeCompare(a.nombre_plato));
    } else if (this.ordenSeleccionado === 'precio-asc') {
      elementosFiltrados = elementosFiltrados.sort((a, b) => a.precio - b.precio);
    } else if (this.ordenSeleccionado === 'precio-desc') {
      elementosFiltrados = elementosFiltrados.sort((a, b) => b.precio - a.precio);
    }

    // actualizamos la lista filtrada y ordenada
    this.MenuItemsFiltrado = elementosFiltrados;
  }

}
