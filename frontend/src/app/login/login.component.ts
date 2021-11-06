import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogsComponent } from '../dialogs/dialogs.component';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public dialog: MatDialog, private _ds: DataService, private _router: Router) { }

  ngOnInit(): void {
  }

  user_username: any
  user_password: any
  user_data: any = {}
  login(){
    this.user_data.user_username = this.user_username
    this.user_data.user_password = this.user_password
    this._ds.sendApiRequest('login', this.user_data).subscribe((data: {payload: any}) =>{
      window.sessionStorage.setItem('user_id', data.payload.id)
      this._router.navigate(['/category'])
    })
  }

  openDialog(option:any){

    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      option: option
    }
    
    dialogConfig.maxWidth = '33%';

    const dialogRef = this.dialog.open(DialogsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}


