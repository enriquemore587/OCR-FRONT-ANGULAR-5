import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';
import { IneComponent } from './components/ine/ine.component';
import { ComprobanteComponent } from './components/comprobante/comprobante.component';
import { NssComponent } from './components/nss/nss.component';
import { TarjetaComponent } from './components/tarjeta/tarjeta.component';
import { RegisterComponent } from './components/register/register.component';
import { PasaporteComponent } from './components/pasaporte/pasaporte.component';

const appRoutes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegisterComponent},
  {path: 'identificaciones', component: IneComponent},
  {path: 'comprobantes', component: ComprobanteComponent},
  {path: 'nss', component: NssComponent},
  {path: 'tarjetas', component: TarjetaComponent},
  {path: 'home', component: WelcomeComponent},
  {path: 'pasaporte', component: PasaporteComponent},
  { path: '**', component: WelcomeComponent }
];

export const appToutingProviders: any[] =[];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
