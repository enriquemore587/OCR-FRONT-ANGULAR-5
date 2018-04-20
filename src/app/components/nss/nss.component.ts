import { Component, OnInit, Inject } from '@angular/core';
import { UploadService } from '../../services/upload.service';
import { GLOBAL } from '../../services/global';
import { UserService } from  '../../services/user.service';

//DIALOGO
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { ConfirmacionCarga } from '../ine/ine.component';

//ERRORES DE FORMULARIO
import { FormsModule, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-nss',
  templateUrl: './nss.component.html',
  styleUrls: ['./nss.component.css'],
  providers: [UploadService, UserService]
})
export class NssComponent implements OnInit {
  url:String;
  validControl = new FormControl('', [
    Validators.required,
  ]);

  constructor(
    private _uploadService: UploadService,
    private _userService: UserService,
    public dialog: MatDialog
  ) {
    this.url = GLOBAL.url
   }

  ngOnInit() {
  }
  
  public nss: string;
  onRead(){
    this._uploadService.makeFilerequest(this.url+'ocr/nss', [], this.filesToUpload, this._userService.getAuth(), 'foto')
    .then((result:any)=>{
      this.nss = result.data.nss;
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
    this.onRead();
  }

  matcher = new MyErrorStateMatcher();
}