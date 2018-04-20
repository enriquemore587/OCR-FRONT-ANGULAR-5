import { Component, OnInit, Inject } from '@angular/core';
import { UploadService } from '../../services/upload.service';
import { GLOBAL } from '../../services/global';
import { UserService } from  '../../services/user.service';
import { FormsModule, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {  ErrorStateMatcher } from '@angular/material/core';

import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { log } from 'util';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-pasaporte',
  templateUrl: './pasaporte.component.html',
  styleUrls: ['./pasaporte.component.css'],
  providers: [UploadService, UserService]
})
export class PasaporteComponent implements OnInit {
  public objeto: any = {
    nombre: '',
    paterno: '',
    materno: '',
    curp: '',
    fecha_nacimiento: '',
    fecha_expedicion: '',
    fecha_caducidad: ''
  };

  validControlPaterno = new FormControl('', [
    Validators.required,
  ]);
  validControlMaterno = new FormControl('', [
    Validators.required,
  ]);
  validControlNombre = new FormControl('', [
    Validators.required,
  ]);
  validControlCurp = new FormControl('', [
    Validators.required,
  ]);
  validControlFNacimiento = new FormControl('', [
    Validators.required,
  ]);
  validControlfecha_expedicion = new FormControl('', [
    Validators.required,
  ]);
  validControlfecha_caducidad = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();
  public url: string;

  constructor(
    private _uploadService: UploadService,
    private _userService: UserService,
    public dialog: MatDialog
  ) {
    this.url = GLOBAL.url
  }

  ngOnInit() {
  }
  
  onRead(){
    this._uploadService.makeFilerequest(this.url+'ocr/pasaporte', [], this.filesToUpload, this._userService.getAuth(), 'foto')
    .then((result:any)=>{

      this.objeto.paterno = result.data.paterno;
      this.objeto.materno = result.data.materno;
      this.objeto.nombre = result.data.nombre;
      this.objeto.curp = result.data.curp;
      this.objeto.fecha_nacimiento = result.data['fecha_nacimiento'];
      this.objeto.fecha_expedicion = result.data['fecha_expedicion'];
      this.objeto.fecha_caducidad = result.data.fecha_caducidad;

    })
  }
  public filesToUpload : Array<File>;
  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    
    this.onRead();
  }

}
