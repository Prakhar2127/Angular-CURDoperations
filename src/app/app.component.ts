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
import { ViewcontentComponent } from './viewcontent/viewcontent.component';


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

  displayedColumns: string[] = ['sno', 'shopName', 'shopId', 'shopDetails', 'contactNo', 'estd', 'country', 'action'];
  dataSource: MatTableDataSource<Shop>;

  constructor(private _dialog: MatDialog, ) {
      this.dataSource = new MatTableDataSource(this.shopArr);
  }

  openAddEditShopForm(shop?: Shop) {
    const dialogRef = this._dialog.open(ShopAddEditComponent, {
      data: shop ? {...shop} : null
    });
  
    dialogRef.componentInstance.formSubmitted.subscribe((formData: any) => {
      if(shop) {
        this.updateShop(formData);
      } else {
      this.addShop(formData);
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && !shop) {
        this.updateShop(result);
      }
    });
  }

  shopArr:   Shop[] = [];
  
  ngOnInit() {
    try {
      const data = localStorage.getItem('myData');
      const localData = localStorage.getItem('shoplist');
      if(data) {
        this.shopData = JSON.parse(data); 
        //console.log(this.shopArr);
        this.addShop(this.shopData);
      
      }
      if(localData != null) {
        const localShopArr: any[] = JSON.parse(localData); 
        localShopArr.forEach((shop: any) => { 
          const existingShop = this.shopArr.find(s => s.shopId === shop.shopId);
          if (!existingShop) {
            this.shopArr.push(shop);
          }
        });
        this.updateLocalStorage();
        //this.shopArr = JSON.parse(localData);
        //this.addShop(this.shopData);
      }
    }catch(error) {
      console.error("Error parsing shopdata:",error);
    }
  }
  
  updateLocalStorage() {
    localStorage.setItem('shoplist', JSON.stringify(this.shopArr));
    this.dataSource.data = this.shopArr;
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
    localStorage.removeItem('myData');
    this.updateLocalStorage();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(viewdata: Shop) {
    const dialogRef = this._dialog.open(ViewcontentComponent, {
      data: viewdata
    });
  }
}
