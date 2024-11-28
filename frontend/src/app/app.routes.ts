import {Routes} from '@angular/router';
import {ListaMenuComponent} from './components/menuComidas/lista-menu/lista-menu.component';
import {RegisterComponent} from './components/login/register/register.component';
import {LoginComponent} from './components/login/login/login.component';
import {ListaCarritoComponent} from './components/carrito/lista-carrito/lista-carrito.component';
import {ListaPedidosComponent} from './components/pedios/lista-pedidos/lista-pedidos.component';
import {PedidosComponent} from './components/administracion/pedidos/pedidos.component';
import {MiPerfilComponent} from './components/perfil/mi-perfil/mi-perfil.component';
import {InformacionCuentaComponent} from './components/perfil/informacion-cuenta/informacion-cuenta.component';
import {MisPedidosComponent} from './components/perfil/mis-pedidos/mis-pedidos.component';
import {CanceladosComponent} from './components/perfil/cancelados/cancelados.component';
import {InicioComponent} from './components/administracion/inicio/inicio.component';
import {AnadirMenuComponent} from './components/administracion/anadir-menu/anadir-menu.component';
import {ListaMenusComponent} from './components/administracion/lista-menus/lista-menus.component';
import {FavoritosComponent} from './components/perfil/favoritos/favoritos.component';
import {TemporadasComponent} from './components/administracion/temporadas/temporadas.component';

export const routes: Routes = [
  {path: '', component: ListaMenuComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'carrito', component: ListaCarritoComponent},
  {path: 'pedidos', component: ListaPedidosComponent},
  {path: 'mi_perfil', component: MiPerfilComponent},
  {path: 'informacion_cuenta', component: InformacionCuentaComponent},
  {path: 'mis_pedidos', component: MisPedidosComponent},
  {path: 'cancelados', component: CanceladosComponent},
  {path: 'favoritos', component: FavoritosComponent},

  // urls para el administrador
  {path: 'administrador/inicio', component: InicioComponent},
  {path: 'administrador/lista_menus', component: ListaMenusComponent},
  {path: 'administrador/anadir_menu', component: AnadirMenuComponent},
  {path: 'administrador/editar_menu/:id', component: AnadirMenuComponent},
  {path: 'administrador/pedidos', component: PedidosComponent},
  {path: 'administrador/temporadas', component: TemporadasComponent},
];
