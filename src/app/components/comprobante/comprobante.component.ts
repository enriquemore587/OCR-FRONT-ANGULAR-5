import { Component, OnInit } from '@angular/core';
import { FormsModule, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';

import { UploadService } from '../../services/upload.service';
import { GLOBAL } from '../../services/global';
import { UserService } from  '../../services/user.service';

import { ErrorStateMatcher } from '@angular/material/core';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-comprobante',
  templateUrl: './comprobante.component.html',
  styleUrls: ['./comprobante.component.css'],
  providers: [UploadService, UserService]
})
export class ComprobanteComponent implements OnInit {

  validControlCodigoPostal = new FormControl('', [
    Validators.required,
  ]);
  validControlEstado = new FormControl('', [
    Validators.required,
  ]);
  validControlMunicipio = new FormControl('', [
    Validators.required,
  ]);
  validControlCalle = new FormControl('', [
    Validators.required,
  ]);
  validControlColonias = new FormControl('', [
    Validators.required,
  ]);

  public obj: any = {};

  url:string;

  constructor(
    private _uploadService: UploadService,
    private _userService: UserService
  ) { 
    this.url = GLOBAL.url
  }

  ngOnInit() {
  }

  colonias= [];

  matcher = new MyErrorStateMatcher();
  onRead(){
    this._uploadService.makeFilerequest(this.url+'ocr/comprobante', [], this.filesToUpload, this._userService.getAuth(), 'foto')
    .then((result:any)=>{
      this.obj.cp = result.data.cp;
      this.obj.estado = result.data.estado;
      this.obj.municipio = result.data.municipio;
      this.obj.calle = result.data.calle;
      this.colonias = result.data.colonias;
    })
  }
  public filesToUpload : Array<File>;
  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    this.onRead();
  }

}
