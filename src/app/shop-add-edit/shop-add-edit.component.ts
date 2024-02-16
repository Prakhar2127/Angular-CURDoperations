import { Component, Inject, Output, EventEmitter} from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Shop } from '../shop';


interface Country {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-shop-add-edit',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, MatIconModule, MatToolbarModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, 
            MatSelectModule, ReactiveFormsModule,],
  templateUrl: './shop-add-edit.component.html',
  styleUrl: './shop-add-edit.component.css',
  providers: [provideNativeDateAdapter()],
})

export class ShopAddEditComponent{

  @Output() formSubmitted  = new EventEmitter<any>();

  shopForm: FormGroup;  

  countries: Country[] = [
    {value: 'India-91', viewValue: 'India'},
    {value: 'USA-1', viewValue: 'USA'},
    {value: 'China-86', viewValue: 'China'},
    {value: 'Nepal-977', viewValue: 'Nepal'},
  ];

  constructor(private _fb: FormBuilder, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: Shop) {
    if(data) {
      this.shopForm = this._fb.group({
        shopName: [data.shopName, Validators.required],
        shopId: [data.shopId, [Validators.required, Validators.minLength(4),Validators.maxLength(4)]],
        shopDetails: [data.shopDetails, Validators.required],
        contactNo: [data.contactNo, [Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
        estd: [data.estd, Validators.required],
        country: [data.country, Validators.required]
      });
    }
    else {
    this.shopForm = this._fb.group ({
      shopName: ['', Validators.required],
      shopId: ['', [Validators.required, Validators.minLength(4),Validators.maxLength(4)]],
      shopDetails: ['', Validators.required],
      contactNo: ['', [Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
      estd: ['', Validators.required],
      country:['', Validators.required]
    });
  }
  };

  //shopArr: any[] = [];

  onFormSubmit() {
    if(this.shopForm.valid) {
      const formData = this.shopForm.value;
      this.formSubmitted.emit(formData);
      localStorage.setItem('myData',JSON.stringify(this.shopForm.value));
      this.dialog.closeAll();

    }
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
