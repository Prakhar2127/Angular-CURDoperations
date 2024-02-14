import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ShopAddEditComponent } from './shop-add-edit/shop-add-edit.component';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DatePipe, NgFor } from '@angular/common';
import { Shop } from './shop';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, MatDialogModule, MatTableModule, MatInputModule, 
            MatFormFieldModule, ShopAddEditComponent, DatePipe, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'shop-app';

  shopData: Shop[] = [];

  constructor(private _dialog: MatDialog, ) {
    
  }

  openAddEditShopForm(shop?: Shop) {
    this._dialog.open(ShopAddEditComponent);
    data: shop;
  }

  shopArr: any[] = [];
  
  ngOnInit() {
    try {
      const data = localStorage.getItem('myData');
      const localData = localStorage.getItem('shoplist');
      if(data) {
        this.shopData = JSON.parse(data); 
        //console.log(this.shopArr);
        this.addShop(this.shopData);
      } else {
        console.error("No shop data found in local storage");
      }
      if(localData != null) {
        this.shopArr = JSON.parse(localData);
        this.addShop(this.shopData);
      }
    }catch(error) {
      console.error("Error parsing shopdata:",error);
    }
  }
  addShop(newShop: any) {
    this.shopArr.push(newShop);
    this.updateLocalStorage();
  }

  updateShop(updatedShop: Shop) {
    const index = this.shopArr.findIndex(shop => shop.shopId === updatedShop.shopId);
    if (index !== -1) {
      this.shopArr[index] = updatedShop;
      this.openAddEditShopForm(updatedShop);
      this.updateLocalStorage();
    }
    //this.openAddEditShopForm(updatedShop);
  }

  deleteShop(shopId: string) {
    this.shopArr = this.shopArr.filter(shop => shop.shopId !== shopId);
    this.updateLocalStorage();
  }

  updateLocalStorage() {
    localStorage.setItem('shoplist', JSON.stringify(this.shopArr));
    this.dataSource.data = this.shopArr;
  }

  displayedColumns: string[] = ['sno', 'shopName', 'shopId', 'shopDetails', 'contactNo', 'estd', 'country', 'action'];
  dataSource = new MatTableDataSource(this.shopArr);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
}
