import { Injectable } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from '@firebase/firestore';

import { Firestore, collectionData, docData } from '@angular/fire/firestore';
import { Folder } from '../../models/folder';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private folderCollection: CollectionReference<DocumentData>;
  folder: string = '';
  folders: Folder[] = [];
  constructor(private readonly firestore: Firestore) {
    this.folderCollection = collection(this.firestore, 'folders');
  }

  setFolder(folder: string) {
    this.folder = folder;
  }

  getAllFolders() {
    return collectionData(this.folderCollection, {
      idField: 'id',
    }) as Observable<Folder[]>;
  }

  getFolder(id: string) {
    const folderDocumentReference = doc(this.firestore, `folders/${id}`);
    return docData(folderDocumentReference, { idField: 'id' });
  }

  createFolder(folder: Folder) {
    return addDoc(this.folderCollection, folder);
  }

  updateFolder(folder: Folder) {
    const folderDocumentReference = doc(
      this.firestore,
      `folders/${folder.name}`
    );
    return updateDoc(folderDocumentReference, { ...folder });
  }

  deleteFolder(id: string) {
    const folderDocumentReference = doc(this.firestore, `folders/${id}`);
    return deleteDoc(folderDocumentReference);
  }
}
