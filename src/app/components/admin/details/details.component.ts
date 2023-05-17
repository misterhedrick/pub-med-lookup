import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {

  constructor(
    public adminService: AdminService,
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
