import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Folder } from 'src/app/models/folder';
import { AdminService } from 'src/app/components/admin/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(public adminService: AdminService) {
    this.adminService.getAllFolders().subscribe((data) => {
      this.adminService.folders = data;
    });
  }

  submit() {
    const tempFolder: Folder = {name: this.name, id: this.name, files: [] };
    this.adminService.createFolder(tempFolder);
  }

  get name() {
    return this.form.get('name')?.value;
  }

}
