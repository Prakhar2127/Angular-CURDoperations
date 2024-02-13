import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { ShopAddEditComponent } from './shop-add-edit/shop-add-edit.component';
import {MatTableModule,MatTableDataSource} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { DatePipe, NgIf, NgFor } from '@angular/common';
import { Shop } from './shop';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, MatDialogModule, MatTableModule, MatInputModule, 
            MatFormFieldModule, ShopAddEditComponent, DatePipe, NgIf, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'shop-app';

  shopData: Shop[] = [];

  constructor(private _dialog: MatDialog, ) {
  }

  openAddEditShopForm() {
    this._dialog.open(ShopAddEditComponent);
  }

  addShop(newShop: Shop) {
    this.shopData.push(newShop);
    this.updateLocalStorage();
  }

  updateShop(updatedShop: Shop) {
    const index = this.shopData.findIndex(shop => shop.shopId === updatedShop.shopId);
    if (index !== -1) {
      this.shopData[index] = updatedShop;
      this.updateLocalStorage();
    }
  }

  deleteShop(shopId: string) {
    this.shopData = this.shopData.filter(shop => shop.shopId !== shopId);
    this.updateLocalStorage();
  }
  
  //shopData: any[] = [];
  //displayedColumns: string[] = ['sno', 'shopName', 'shopId', 'shopDetails', 'contactNo', 'estd', 'country', 'action'];
  
  ngOnInit() {
    try {
      const data = localStorage.getItem('myData');
      if(data) {
        this.shopData = JSON.parse(data) as Shop[]; 
        console.log(this.shopData);
      } else {
        console.error("No shop data found in local storage");
      }
    }catch(error) {
      console.error("Error parsing shopdata:",error);
    }
  }
  private updateLocalStorage() {
    localStorage.setItem('myData', JSON.stringify(this.shopData));
  }
  // openAddEditShopForme(shop?: any) {
  //   this._dialog.open(ShopAddEditComponent, { data: shop });
  // }

  // addShop(shop: any) {
  //   this.shopData.push(shop);
  //   this.saveToLocalStorage();
  // }

  // editShop(shop: any) {
  //   const index = this.shopData.findIndex((s) => s.shopId === shop.shopId);
  //   this.shopData[index] = shop;
  //   this.saveToLocalStorage();
  // }

  // deleteShop(shop: any) {
  //   const index = this.shopData.findIndex((s) => s.shopId === shop.shopId);
  //   this.shopData.splice(index, 1);
  //   this.saveToLocalStorage();
  // }

  // saveToLocalStorage() {
  //   localStorage.setItem('myData', JSON.stringify(this.shopData));
  // }
  
}
