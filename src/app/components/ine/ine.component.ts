import { Component, OnInit, Inject } from '@angular/core';
import { UploadService } from '../../services/upload.service';
import { GLOBAL } from '../../services/global';
import { UserService } from  '../../services/user.service';
import { FormsModule, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {  ErrorStateMatcher } from '@angular/material/core';

import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-ine',
  templateUrl: './ine.component.html',
  styleUrls: ['./ine.component.css'],
  providers: [UploadService, UserService]
})
export class IneComponent implements OnInit {
  public url: string;
  
  public objeto: any = {
    nombre: '',
    paterno: '',
    materno: '',
    genero: '',
    curp: '',
    rfc: '',
    estado: '',
    clave: ''
  };
  
  validControlNombre = new FormControl('', [
    Validators.required,
  ]);
  validControlPaterno = new FormControl('', [
    Validators.required,
  ]);
  validControlMaterno = new FormControl('', [
    Validators.required,
  ]);
  validControlGenero = new FormControl('', [
    Validators.required,
  ]);
  validControlCurp = new FormControl('', [
    Validators.required,
  ]);
  validControlRfc = new FormControl('', [
    Validators.required,
  ]);
  validControlEstado = new FormControl('', [
    Validators.required,
  ]);
  validControlClave = new FormControl('', [
    Validators.required,
  ]);

  genero = [
    {value: 'M', viewValue: 'M'},
    {value: 'H', viewValue: 'H'}
  ];

  constructor(
    private _uploadService: UploadService,
    private _userService: UserService,
    public dialog: MatDialog
  ) {
    this.url = GLOBAL.url
  }

  ngOnInit() {
  }
  onSubmit(){
    console.log("Se guardara");
  }
  onRead(){
    this._uploadService.makeFilerequest(this.url+'ocr/ine', [], this.filesToUpload, this._userService.getAuth(), 'foto')
    .then((result:any)=>{
      this.objeto.paterno = result.data.paterno;
      this.objeto.materno = result.data.materno;
      this.objeto.nombre = result.data.nombre;
      this.objeto.curp = result.data.curp;
      this.objeto.estado = result.data['estado_nacimiento'].name_state;
      this.objeto.clave = result.data['clave electoral'];
      this.objeto.rfc = result.data.rfc;
      this.validControlGenero = new FormControl(result.data.sexo, [
        Validators.required,
      ]);
    })
  }
  public filesToUpload : Array<File>;
  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    this.openDialog(this.filesToUpload[0].name);
  }
  
  openDialog(name) {
    this.dialog.open(ConfirmacionCarga, {
      data: {
        name: name
      }
    });
  }

  matcher = new MyErrorStateMatcher();
}
@Component({
  selector: 'notification',
  templateUrl: 'notification.html',
})
export class ConfirmacionCarga {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
