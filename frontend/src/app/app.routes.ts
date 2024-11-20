import { Routes } from '@angular/router';
import {ListaMenuComponent} from './components/menuComidas/lista-menu/lista-menu.component';
import {RegisterComponent} from './components/login/register/register.component';
import {LoginComponent} from './components/login/login/login.component';
import {ListaCarritoComponent} from './components/carrito/lista-carrito/lista-carrito.component';
import {ListaPedidosComponent} from './components/pedios/lista-pedidos/lista-pedidos.component';
import {PedidosComponent} from './components/administracion/pedidos/pedidos.component';

export const routes: Routes = [
  {path: '', component: ListaMenuComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'carrito', component: ListaCarritoComponent},
  {path: 'pedidos', component: ListaPedidosComponent},

  {path: 'administrador/pedidos', component: PedidosComponent},
];
