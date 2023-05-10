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
  folder: Folder;
  folders: Folder[] = [];
  constructor(private readonly firestore: Firestore) {}

  setFolderCollection(uid: string) {
    this.folderCollection = collection(this.firestore, uid);
  }

  setFolder(folder: Folder) {
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

  updateFolder(uid: string, folder: Folder) {
    const folderDocumentReference = doc(
      this.firestore,
      `${uid}/${folder.id}`
    );
    return updateDoc(folderDocumentReference, { ...folder });
  }

  deleteFolder(id: string) {
    const folderDocumentReference = doc(this.firestore, `folders/${id}`);
    return deleteDoc(folderDocumentReference);
  }
}
