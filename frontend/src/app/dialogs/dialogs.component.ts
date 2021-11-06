import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.scss']
})
export class DialogsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<DialogsComponent>, public  router: Router, private _ds: DataService, public _dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  user_fname: any
  user_mname: any
  user_lname: any
  user_username: any
  user_password: any
  user_email: any
  user_phone: any
  user_data: any = {}

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
    })
  }

  logout(){
    window.sessionStorage.clear()
    this.router.navigate(['login']);
    this._dialog.closeAll()
    this.dialogRef.close();
  }

  cart_data: any = {}
  addToCart(product_id: any) {
    let id = window.sessionStorage.getItem('user_id')
    
    this.cart_data.product_id = product_id
    this.cart_data.user_id = id

    this._ds.sendApiRequest('addToCart/', this.cart_data).subscribe((data: {payload: any}) =>{
      this._dialog.closeAll()
    })
  }

  closeDialog() {
    this._dialog.closeAll()
    this.dialogRef.close();
  }




}
