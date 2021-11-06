import { Component, OnInit } from '@angular/core';
import { DialogsComponent } from '../dialogs/dialogs.component';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(private _ds: DataService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.pullCart()
    this.pullOrder()
    this.pullProducts()
  }

  pullCart() {
    let id = window.sessionStorage.getItem('user_id')
    this._ds.sendApiRequest2('cart/' + id).subscribe((data: {payload: any}) => {
    })
  }

  pullOrder() {
    let id = window.sessionStorage.getItem('user_id')
    this._ds.sendApiRequest2('order/' + id).subscribe((data: {payload: any}) => {
    })
  }
  
  product_data: any[] = []
  pullProducts() {
    this._ds.sendApiRequest2('product/').subscribe((data: {payload: any}) => {
      this.product_data = data.payload
    })
  }
  
  selected: any = 'All Products';
  productByCategory() {
    let filter_data
    if(this.selected == 'All Products') {
      filter_data = ''
    }

    this._ds.sendApiRequest2('productByCategory/' + filter_data).subscribe((data: {payload: any}) => {
      this.product_data = data.payload
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
