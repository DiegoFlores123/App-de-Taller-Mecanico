import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login', // Cambié esta línea para redirigir a la página de login
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then(m => m.MenuPageModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesPageModule)
  },
  {
    path: 'inventario',
    loadChildren: () => import('./inventario/inventario.module').then(m => m.InventarioPageModule)
  },
  {
    path: 'personal',
    loadChildren: () => import('./personal/personal.module').then(m => m.PersonalPageModule)
  },
  {
    path: 'cliente-detalle',
    loadChildren: () => import('./cliente-detalle/cliente-detalle.module').then( m => m.ClienteDetallePageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./historial/historial.module').then( m => m.HistorialPageModule)
  },
  {
    path: 'inventario-form',
    loadChildren: () => import('./inventario-form/inventario-form.module').then( m => m.InventarioFormPageModule)
  },
  {
    path: 'historial-inventario',
    loadChildren: () => import('./historial-inventario/historial-inventario.module').then( m => m.HistorialInventarioPageModule)
  },
  {
    path: 'agregar-tarea',
    loadChildren: () => import('./agregar-tarea/agregar-tarea.module').then( m => m.AgregarTareaPageModule)
  },
  {
    path: 'registrar-personal',
    loadChildren: () => import('./registrar-personal/registrar-personal.module').then( m => m.RegistrarPersonalPageModule)
  },
  {
    path: 'gestionar-asistencia',
    loadChildren: () => import('./gestionar-asistencia/gestionar-asistencia.module').then( m => m.GestionarAsistenciaPageModule)
  },
  {
    path: 'editar-personal',
    loadChildren: () => import('./editar-personal/editar-personal.module').then( m => m.EditarPersonalPageModule)
  },  {
    path: 'historial-tareas',
    loadChildren: () => import('./historial-tareas/historial-tareas.module').then( m => m.HistorialTareasPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
