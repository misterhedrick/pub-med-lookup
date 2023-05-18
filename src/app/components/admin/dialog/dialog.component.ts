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
  folder: Folder;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DetailsDialogData,
    public adminService: AdminService,
    private authService: AuthService,
    public dialog: MatDialog
  ) {
    this.uid = this.authService.loggedInUser.uid;
  }

  uploadFile(input: HTMLInputElement) {
    if (!input.files) return;
    const file: File = input.files[0];
    if (file) {
      this.setUploadDetails().then(() => {
        const storageRef = ref(
          this.storage,
          `${this.uid}/${this.folder.name}/${file.name}`
        );
        uploadBytesResumable(storageRef, file).then((response) => {
          this.folder.files.push({
            filename: response.metadata.name,
            fullpath: response.metadata.fullPath,
            thumbnail: '',
          });
          this.adminService.updateFolder(this.uid, this.folder);
          if (this.data.action === 'upload') {
            this.adminService.images.push(
              this.adminService.getImageURL(response.metadata.fullPath)
            );
          }
          this.dialog.closeAll();
        });
      });
    }
  }

  setUploadDetails() {
    return new Promise((resolve, reject) => {
      if (this.data.action === 'send') {
        this.authService.loggedInUser.uid === 'Xpp2ao4Rf9bTo38vAwGFzVNIZHK2'
          ? (this.uid = 'jbn4I3C7uMcZQa9RXvnt6j9iq082')
          : (this.uid = 'Xpp2ao4Rf9bTo38vAwGFzVNIZHK2');
          console.log('uid: ', this.uid);
        this.adminService.getFolder(this.uid, 'inbox').subscribe((data) => {
          console.log('data: ', data);
          this.folder = data as Folder;
          console.log('folder: ', this.folder);
          resolve(true);
        });
      } else {
        this.folder = this.adminService.folder;
        resolve(true);
      }
    });
  }
}
