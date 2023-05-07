import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Folder } from 'src/app/models/folder';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  folders: Folder[] = [];
  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  constructor(private adminService: AdminService) {
    this.adminService.getAll().subscribe((data) => {
      console.log(data);
      this.folders = data;
    });
  }

  submit() {
    console.log('name: ', this.name);
    const tempFolder: Folder = {name: this.name};
    this.adminService.create(tempFolder);
  }

  get name() {
    return this.form.get('name')?.value;
  }

}
