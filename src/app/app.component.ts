import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ShopAddEditComponent } from './shop-add-edit/shop-add-edit.component';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, MatDialogModule, MatTableModule, MatInputModule, MatFormFieldModule, ShopAddEditComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'shop-app';

  constructor(private _dialog: MatDialog, ) {
  }

  openAddEditShopForm() {
    this._dialog.open(ShopAddEditComponent);
  }

  shopData: any[] = [];
  ngOnInit() {
    try {
      const data = localStorage.getItem('myData');
      if(data) {
        this.shopData = JSON.parse(data); 
      } else {
        console.error("No shop data found in local storage");
      }
    }catch(error) {
      console.error("Error parsing shopdata:",error);
    }
  }
}
