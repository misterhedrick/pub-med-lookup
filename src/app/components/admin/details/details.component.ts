import { Component, inject } from '@angular/core';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';
import { AdminService } from '../admin.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  private readonly storage: Storage = inject(Storage);
  images: any[] = [];

  constructor(public adminService: AdminService, private authService: AuthService) {
    for (var file of adminService.folder.files) {
      this.images.push(this.adminService.getImageURL(file.fullpath));
    }
  }

  uploadFile(input: HTMLInputElement) {
    if (!input.files) return
    const files: FileList = input.files;
    for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        if (file) {
            const storageRef = ref(this.storage, `${this.authService.loggedInUser.uid}/${this.adminService.folder.name}/${file.name}`);
            uploadBytesResumable(storageRef, file).then((response) => {
              this.adminService.folder.files.push({filename: response.metadata.name, fullpath: response.metadata.fullPath, thumbnail: ''});
              this.adminService.updateFolder(this.authService.loggedInUser.uid, this.adminService.folder);
            });
        }
    }
}
getImage(file: any) {
  return this.adminService.getImageURL(file.fullpath);
} 
}
