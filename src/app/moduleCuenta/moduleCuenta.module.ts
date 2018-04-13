// importar modulos necesarios para crear modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { CuentaRoutingModule } from './cuentaRouting.module';


// importar componentes
import { EditarCuentaComponent } from './components/editarCuenta/editarCuenta.component';
import { MostrarCuentaComponent } from './components/mostrarCuenta/mostrarCuenta.component';
import { MainCuentaComponent } from './components/mainCuenta/mainCuenta.component';

/** decorar ngModule para cargar los componentes y la configuracion de los modulos */
@NgModule({
  imports: [CommonModule, FormsModule, CuentaRoutingModule, HttpModule],
  declarations: [
    EditarCuentaComponent,
    MostrarCuentaComponent,
    MainCuentaComponent
  ],
  exports: [    /** ESTO SE PUEDE HACER SI SEVA HA HACER USO DE ALGÚN COMPONENTE EN ESPESIFICO EN ESTE CASO NO SE HARA PERO NO AFECTA EL HACERLO */
    EditarCuentaComponent,
    MostrarCuentaComponent,
    MainCuentaComponent
  ],
  providers: []
})
export class ModuloCuentaModule {

}
