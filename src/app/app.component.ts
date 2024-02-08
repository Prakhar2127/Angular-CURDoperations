import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ShopAddEditComponent } from './shop-add-edit/shop-add-edit.component';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

export interface ShopTable {
  sNo: number;
  shopName: string;
  shopId: number;
  shopDetails: string;
  contactNo: number;
  estd: string;
  country: string;
  action: string
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, MatDialogModule, MatTableModule, MatInputModule, MatFormFieldModule, ShopAddEditComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'shop-app';

  constructor(private _dialog: MatDialog) {
  }

  openAddEditShopForm() {
    this._dialog.open(ShopAddEditComponent);
  }

  displayedColumns: string[] = ['sNo', 'shopName', 'shopId', 'shopDetails','contactNo','estd','country', 'action'];
  dataSource = new MatTableDataSource<any>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onChildClick(array: string[]) {
    //console.log(array);
    this.dataSource = new MatTableDataSource(array);
    localStorage.setItem('myData',JSON.stringify(array));
    const shopData = JSON.parse(localStorage.getItem('myData') as string);
    console.log(shopData);
  }
}
