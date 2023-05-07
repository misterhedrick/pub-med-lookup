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
import { Folder } from '../models/folder';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private folderCollection: CollectionReference<DocumentData>;

  constructor(private readonly firestore: Firestore) { 
    this.folderCollection = collection(this.firestore, 'folders');
  }
  getAll() {
    return collectionData(this.folderCollection, {
      idField: 'id',
    }) as Observable<Folder[]>;
  }

  get(id: string) {
    const folderDocumentReference = doc(this.firestore, `folder/${id}`);
    return docData(folderDocumentReference, { idField: 'id' });
  }

  create(folder: Folder) {
    return addDoc(this.folderCollection, folder);
  }

  update(folder: Folder) {
    const folderDocumentReference = doc(
      this.firestore,
      `folder/${folder.name}`
    );
    return updateDoc(folderDocumentReference, { ...folder });
  }

  delete(id: string) {
    const folderDocumentReference = doc(this.firestore, `folder/${id}`);
    return deleteDoc(folderDocumentReference);
  }
}
