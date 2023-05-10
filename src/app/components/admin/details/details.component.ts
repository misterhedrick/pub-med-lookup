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

  constructor(public adminService: AdminService, private authService: AuthService) {}

  uploadFile(input: HTMLInputElement) {
    if (!input.files) return

    const files: FileList = input.files;

    for (let i = 0; i < files.length; i++) {
        const file = files.item(i);
        if (file) {
            const storageRef = ref(this.storage, `${this.authService.loggedInUser.uid}/${this.adminService.folder}/${file.name}`);
            uploadBytesResumable(storageRef, file).then((response) => {
              console.log(response);
              console.log('file: ', file);
              const downloadURL = getDownloadURL(response.ref);
              
            });
        }
    }
} 
}
