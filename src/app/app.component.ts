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

const SHOP_DATA: ShopTable[] = [
  {sNo: 1, shopName: 'Hydra Man', shopId: 2467, shopDetails: 'Water solutions', contactNo: 9352169480, estd: '12/03/2005', country: 'Iran', action: ''},
  {sNo: 2, shopName: 'Raymonds Store', shopId: 4218, shopDetails: 'Clothing Store', contactNo: 6598541203, estd: '12/05/2009', country: 'China', action: ''},
  
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, MatDialogModule, MatTableModule, MatInputModule, MatFormFieldModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'shop-app';

  constructor(private _dialog: MatDialog) {}

  openAddEditShopForm() {
    this._dialog.open(ShopAddEditComponent);
  }

  displayedColumns: string[] = ['sNo', 'shopName', 'shopId', 'shopDetails','contactNo','estd','country', 'action'];
  dataSource = new MatTableDataSource(SHOP_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
}
