import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss']
})
export class DialogsComponent implements OnInit {

  message: any
  private subs!: Subscription

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<DialogsComponent>, public  router: Router, private _ds: DataService, public _dialog: MatDialog, public _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.pullCart()
  }

  sendMessage() {
    this._ds.sendUpdate('Message Update!')
  }

  user_fname: any
  user_mname: any
  user_lname: any
  user_username: any
  user_password: any
  user_email: any
  user_phone: any
  user_data: any = {}
  selected = 'name';

  register() {
    this.user_data.user_fname = this.user_fname
    this.user_data.user_mname = this.user_mname
    this.user_data.user_lname = this.user_lname
    this.user_data.user_username = this.user_username
    this.user_data.user_password = this.user_password
    this.user_data.user_email = this.user_email
    this.user_data.user_phone = this.user_phone
    
    this._ds.sendApiRequest('register/', this.user_data).subscribe((data: {payload: any}) =>{
      this._dialog.closeAll()
      this._snackBar.open("Registered successfully" , '', {
        duration: 2000
      });
    },(er:any)=>{
      this._snackBar.open("Please check all the fields", '', {
        duration: 2000
      });

    })
  }

  cart_info: any[] = []
  pullCart() {
    let id = window.sessionStorage.getItem('user_id')
    this._ds.sendApiRequest2('cart/' + id).subscribe((data: {payload: any}) => {
      this.cart_info = data.payload
    })
  }
  
  order_info: any = {}
  product_id: any = []
  order_item_quantity: any = []
  order_total_product: any = []
  order_total: any

  checkOut() {
    this.order_info = {}
    this.product_id = []
    this.order_item_quantity = []
    

    if(this.cart_info.length != 0) {
      let id = window.sessionStorage.getItem('user_id')
      for(var i = 0; i < this.cart_info.length; i++) {
        this.product_id.push(this.cart_info[i].product_id)
        this.order_item_quantity.push(this.cart_info[i].cart_quantity)
        this.order_total_product.push(this.cart_info[i].cart_quantity * this.cart_info[i].product_price)
      }

      this.order_total_product = this.order_total_product.reduce((acc: number, cur: any) => acc + Number(cur), 0)
      
      this.order_info.product_id = this.product_id
      this.order_info.order_shipping = 100
      this.order_info.order_total = this.order_total_product
      this.order_info.order_grandtotal = this.order_total_product + 100
      this.order_info.user_id = id
      this.order_info.order_item_quantity = this.order_item_quantity

      this._ds.sendApiRequest('placeOrder/', this.order_info).subscribe((data: {payload:any []}) => {
        this.clearCart()
        this.sendMessage()

        this._snackBar.open("Successfully check out. Please check your orders" , '', {
          duration: 2000
        });
      })
    }
  }

  cart_clear: any = {}
  clearCart() {
    this.cart_clear.cart_status = 0
    let id = window.sessionStorage.getItem('user_id')
    this._ds.sendApiRequest('clearCart/' + id, this.cart_clear).subscribe((data: {payload: any}) => {
      this.sendMessage()
      this._dialog.closeAll()
    })
  }

  logout(){
    window.sessionStorage.clear()
    this.router.navigate(['login']);
    this._dialog.closeAll()
    this.dialogRef.close();

    
    this._snackBar.open("Successfully logged out" , '', {
      duration: 2000
    });

  }

  cart_data: any = {}
  addToCart(product_id: any) {
    let id = window.sessionStorage.getItem('user_id')
    
    this.cart_data.product_id = product_id
    this.cart_data.user_id = id

    this._ds.sendApiRequest('addToCart/', this.cart_data).subscribe((data: {payload: any}) =>{
      this._dialog.closeAll()
      this.sendMessage()

      
      this._snackBar.open("Added to cart" , '', {
        duration: 2000
      });
    })
  }

  closeDialog() {
    this._dialog.closeAll()
    this.dialogRef.close();
  }

}
