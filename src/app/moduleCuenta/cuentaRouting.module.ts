import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/** COMPONENTES */
import { EditarCuentaComponent } from './components/editarCuenta/editarCuenta.component';
import { MostrarCuentaComponent } from './components/mostrarCuenta/mostrarCuenta.component';
import { MainCuentaComponent } from './components/mainCuenta/mainCuenta.component';

const cuentaRoutes : Routes = [
  {
    path: 'cuenta-panel',
    component: MainCuentaComponent,
    children: [
      {path: '', redirectTo: 'mostrar', pathMatch: 'full'},
      {path: 'editar', component: EditarCuentaComponent},
      {path: 'mostrar', component: MostrarCuentaComponent}
    ]
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(cuentaRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CuentaRoutingModule {

}
