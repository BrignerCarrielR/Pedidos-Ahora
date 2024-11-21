import { Routes } from '@angular/router';
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

  {path: 'administrador/pedidos', component: PedidosComponent},
];
