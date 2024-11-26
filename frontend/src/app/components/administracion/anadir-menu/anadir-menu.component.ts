import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from '../inicio/inicio.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../api.service';
import { AuthService } from '../../../auth.service';
import { ActivatedRoute } from '@angular/router';  // Importar ActivatedRoute para leer los parámetros de la URL

interface Menu {
  nombre_plato: string;
  descripcion: string;
  precio: number;
  tipo_comida_id: number;
  imagen: string;
  disponible: boolean;
}

@Component({
  selector: 'app-anadir-menu',
  standalone: true,
  imports: [CommonModule, InicioComponent, HttpClientModule, FormsModule],
  providers: [ApiService],
  templateUrl: './anadir-menu.component.html',
  styleUrls: ['./anadir-menu.component.css']
})

export class AnadirMenuComponent implements OnInit {
  tipoComida: any[] = [];
  isEditMode: boolean = false;  // Para saber si estamos en modo edición
  menuId: number = 0;  // Para almacenar el id del menú si estamos editando
  menu: Menu = {
    nombre_plato: '',
    descripcion: '',
    precio: 0,
    tipo_comida_id: 0,
    imagen: '',
    disponible: true
  };

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private route: ActivatedRoute // Inyectar ActivatedRoute para leer los parámetros de la URL
  ) {
    this.getTipoComida();
  }


  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.menuId = +id;
      this.loadMenuData();  // Cargar los datos del menú
    }
  }

  loadMenuData() {
    // Usar el tipo correcto cuando se hace la solicitud
    this.apiService.get<Menu>(`menu_comida/${this.menuId}`)
      .subscribe(
        (data) => {
          this.menu = data;  // Esto ahora debería funcionar porque data es del tipo Menu
          console.log(data);
        },
        (error) => {
          console.log(error);
          alert('Error al cargar los datos del menú');
        }
      );
  }

  onImageSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.menu.imagen = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  GuardarMenu(): void {
    console.log(this.menu);
    if (!this.menu.nombre_plato || this.menu.tipo_comida_id == 0 || this.menu.precio == 0 || !this.menu.descripcion) {
      alert('Faltan campos por ingresar');
    } else {
      this.isEditMode ? this.putActualizarMenu() : this.postCrearMenu();  // Si estamos en edición, llamar a la actualización
    }
  }

  limpiarFormulario(): void {
    this.menu = {
      nombre_plato: '',
      descripcion: '',
      precio: 0,
      tipo_comida_id: 0,
      imagen: '',
      disponible: true  // Asegurarse de que este campo esté presente en el formulario
    };
  }

  postCrearMenu() {
    this.apiService.post('menu_comida', this.menu)
      .subscribe(
        data => {
          console.log(data);
          window.location.href = '/administrador/lista_menus';
        },
        error => {
          console.log(error);
          alert(error);
        }
      );
  }

  putActualizarMenu() {
    if (this.menu && this.menu.precio) {
      // Si 'precio' es un string, conviértelo a un número flotante
      this.menu.precio = parseFloat(this.menu.precio.toString());  // Primero conviértelo a string y luego a número
    }

    this.apiService.put(`menu_comida/${this.menuId}`, this.menu)
      .subscribe(
        data => {
          console.log(data);
          window.location.href = '/administrador/lista_menus';
        },
        error => {
          console.log('MENU',this.menu)
          console.log('Error response:', error);  // Ver los detalles completos del error
          alert('Error al actualizar el menú: ' + error.message);
        }
      );
  }


  getTipoComida() {
    this.apiService.get<any[]>('tipo_comida')
      .subscribe(
        data => {
          this.tipoComida = data;
        },
        error => {
          console.log(error);
          alert(error);
        }
      );
  }
}
