import { Component, Inject, inject } from '@angular/core';
import { Storage, ref, uploadBytesResumable } from '@angular/fire/storage';
import { AdminService } from '../admin.service';
import { AuthService } from '../../auth/auth.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DetailsDialogData } from 'src/app/models/details-dialog-data';
import { Folder } from 'src/app/models/folder';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  private readonly storage: Storage = inject(Storage);
  uid = '';
  folder: Folder = { name: '', id: '', files: [] };
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DetailsDialogData,
    public adminService: AdminService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {
    this.uid = this.authService.loggedInUser.uid;
  }

  uploadFile(input: HTMLInputElement) {
    if (this.data.action === 'send') {
      this.authService.loggedInUser.uid === 'Xpp2ao4Rf9bTo38vAwGFzVNIZHK2'
        ? (this.uid = 'jbn4I3C7uMcZQa9RXvnt6j9iq082')
        : (this.uid = 'Xpp2ao4Rf9bTo38vAwGFzVNIZHK2');
      this.folder.name = 'inbox';
    } else {
      this.folder = this.adminService.folder;
    }
    if (!input.files) return;
    const file: File = input.files[0];
    if (file) {
      const storageRef = ref(
        this.storage,
        `${this.uid}/${this.folder.name}/${file.name}`
      );
      uploadBytesResumable(storageRef, file).then((response) => {
        if (this.data.action === 'send') {
          console.log('need to add to send inbox folder');
        } else {
          this.adminService.folder.files.push({
            filename: response.metadata.name,
            fullpath: response.metadata.fullPath,
            thumbnail: '',
          });
          this.adminService.updateFolder(this.uid, this.adminService.folder);
          this.adminService.images.push(
            this.adminService.getImageURL(response.metadata.fullPath)
          );
        }

        this.dialog.closeAll();
      });
    }
  }
}
