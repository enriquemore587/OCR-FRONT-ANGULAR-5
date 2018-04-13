import { Component } from '@angular/core';

@Component({
  selector: 'editar-cuenta',
  template: `
    <!--h3>{{title}}</h3-->
  <div class="form-group col-md-6">
    <label>Email</label>
    <input type="text" class="form-control" [(ngModel)]="email" placeholder="example@example.com  ">
    <button (click)="guardarEmail()" class="btn btn-light">Guardar</button>
  </div>
  `,
})
export class EditarCuentaComponent {
  title = 'Editar cuenta';
  email: string;
  guardarEmail() {
    localStorage.setItem('email', this.email);
  }
}
