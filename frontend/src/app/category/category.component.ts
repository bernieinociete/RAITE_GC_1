import { Component, OnInit } from '@angular/core';
import { DialogsComponent } from '../dialogs/dialogs.component';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  message: any
  private subs!: Subscription

  constructor(private _ds: DataService, public dialog: MatDialog) { 
    this.subs = this._ds.getUpdate().subscribe(message => {
      this.message = this.message
      this.pullCart()
      this.pullOrder()
      this.pullProducts()
    })
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource: any = [];
  
  ngOnInit(): void {
    this.pullCart()
    this.pullOrder()
    this.pullProducts()
    this.pullUser()
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }


  sendMessage() {
    this._ds.sendUpdate('Message Update!')
  }

  cart_data: any[] = []
  pullCart() {
    let id = window.sessionStorage.getItem('user_id')
    this._ds.sendApiRequest2('cart/' + id).subscribe((data: {payload: any}) => {
      this.cart_data = data.payload
    })
  }

  pullOrder() {
    let id = window.sessionStorage.getItem('user_id')
    this._ds.sendApiRequest2('order/' + id).subscribe((data: {payload: any}) => {
      this.dataSource = data.payload
    })
  }
  
  product_data: any[] = []
  pullProducts() {
    this._ds.sendApiRequest2('product/').subscribe((data: {payload: any}) => {
      this.product_data = data.payload
    })
  }

  user_data: any[] = []
  pullUser() {
    let id = window.sessionStorage.getItem('user_id')
    this._ds.sendApiRequest2('user/' + id).subscribe((data: {payload: any}) => {
      this.user_data = data.payload
    })
  }
  
  selected: any = 'All Products';
  productByCategory() {
    let filter_data
    if(this.selected == 'All Products') {
      filter_data = ''
    } else {
      filter_data = this.selected
    }

    this._ds.sendApiRequest2('productByCategory/' + filter_data).subscribe((data: {payload: any}) => {
      this.product_data = data.payload
    })
  }

  cart_info: any = {}
  addQuantity(cart: any) {
    this.cart_info = {}
    this.cart_info.cart_quantity = cart.cart_quantity + 1

    if(cart.cart_quantity < cart.product_quantity) {
      this._ds.sendApiRequest('editQuantity/' + cart.cart_id, this.cart_info).subscribe((data: {payload: any}) =>{
        this.sendMessage()
      })
    }
  }

  subtractQuantity(cart: any) {
    this.cart_info = {}
    this.cart_info.cart_quantity = cart.cart_quantity - 1

    if(cart.cart_quantity != 1) {
      this._ds.sendApiRequest('editQuantity/' + cart.cart_id, this.cart_info).subscribe((data: {payload: any}) =>{
        this.sendMessage()
      })
    }
  }

  removeCart(cart: any) {
    this.cart_info = {}
    this.cart_info.cart_status = 0

    this._ds.sendApiRequest('editQuantity/' + cart.cart_id, this.cart_info).subscribe((data: {payload: any}) =>{
      this.sendMessage()
    })
  }
  
  openDialog(option:any, product: any){

    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      option: option,
      product_data: product
    }
    
    dialogConfig.maxWidth = '33%';
    

    const dialogRef = this.dialog.open(DialogsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  
}
