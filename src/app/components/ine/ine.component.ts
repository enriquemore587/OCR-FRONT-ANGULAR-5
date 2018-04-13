import { Component, OnInit } from '@angular/core';
import { UploadService } from '../../services/upload.service';
import { GLOBAL } from '../../services/global';
import { UserService } from  '../../services/user.service';
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
  selector: 'app-ine',
  templateUrl: './ine.component.html',
  styleUrls: ['./ine.component.css'],
  providers: [UploadService, UserService]
})
export class IneComponent implements OnInit {
  public url: string;

  validControl = new FormControl('', [
    Validators.required,
  ]);

  foods = [
    {value: '0', viewValue: 'M'},
    {value: '1', viewValue: 'H'}
  ];
  constructor(
    private _uploadService: UploadService,
    private _userService: UserService
  ) {
    this.url = GLOBAL.url
  }

  ngOnInit() {
  }
  onSubmit(registerForm){
    console.log(1);
    
    this._uploadService.makeFilerequest(this.url+'ocr/ine', [], this.filesToUpload, this._userService.getAuth(), 'foto')
    .then((result:any)=>{
      console.log(result);
      
    })
  }
  public filesToUpload : Array<File>;
  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload);
  }

}
