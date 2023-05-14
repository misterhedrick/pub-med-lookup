import { Component, Inject, inject } from '@angular/core';
import {
  Storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from '@angular/fire/storage';
import { AdminService } from '../admin.service';
import { AuthService } from '../../auth/auth.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  private readonly storage: Storage = inject(Storage);
  
  constructor(
    public adminService: AdminService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  openDialog(action: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        action: action,
      },
    });
  }
}
