import { Component, Inject, inject } from '@angular/core';
import {
  Storage,
  ref,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { AdminService } from '../../admin.service';
import { AuthService } from '../../../auth/auth.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DetailsDialogData } from 'src/app/models/details-dialog-data';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  private readonly storage: Storage = inject(Storage);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DetailsDialogData,
    public adminService: AdminService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {}

  uploadFile(input: HTMLInputElement) {
    if (!input.files) return;
    const files: FileList = input.files;
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        const storageRef = ref(
          this.storage,
          `${this.authService.loggedInUser.uid}/${this.adminService.folder.name}/${file.name}`
        );
        uploadBytesResumable(storageRef, file).then((response) => {
          this.adminService.folder.files.push({
            filename: response.metadata.name,
            fullpath: response.metadata.fullPath,
            thumbnail: '',
          });
          this.adminService.updateFolder(
            this.authService.loggedInUser.uid,
            this.adminService.folder
          );
          this.adminService.images.push(this.adminService.getImageURL(response.metadata.fullPath));
          this.dialog.closeAll()
        });
      }
    }
  }
}
