import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetailsDialogData } from 'src/app/models/details-dialog-data';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: DetailsDialogData) {}
}
