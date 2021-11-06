import { Component, OnInit } from '@angular/core';
import { DialogsComponent } from '../dialogs/dialogs.component';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DataService } from '../services/data.service';

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

  constructor(private _ds: DataService, public dialog: MatDialog) { }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
  
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
