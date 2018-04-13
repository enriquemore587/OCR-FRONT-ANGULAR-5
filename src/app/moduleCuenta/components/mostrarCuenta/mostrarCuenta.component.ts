import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'mostrar-cuenta',
  templateUrl: './mostrarCuenta.component.html'
})
export class MostrarCuentaComponent implements OnInit, DoCheck{
  title = 'Mostrar cuenta';
  email: string;
  eliminarEmail(){
    localStorage.removeItem('email');
    localStorage.clear();
    this.email = null;
  }
  ngOnInit(){
    this.email = localStorage.getItem('email');
  }
  ngDoCheck(){
    this.email = localStorage.getItem('email');
  }
}
