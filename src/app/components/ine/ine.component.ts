import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./ine.component.css']
})
export class IneComponent implements OnInit {

  validControl = new FormControl('', [
    Validators.required,
  ]);
  foods = [
    {value: '0', viewValue: 'M'},
    {value: '1', viewValue: 'H'}
  ];
  constructor() { }

  ngOnInit() {
  }

}
