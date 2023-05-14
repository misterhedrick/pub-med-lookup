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
import { Observable, from, startWith } from 'rxjs';
import { StorageReference, getDownloadURL } from '@angular/fire/storage';
import { getStorage, ref } from '@firebase/storage';
import { keepUnstableUntilFirst } from '@angular/fire';
import { traceUntilFirst } from '@angular/fire/performance';

const TRANSPARENT_PNG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';


@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private folderCollection: CollectionReference<DocumentData>;
  storageRef: StorageReference;
  folder: Folder;
  folders: Folder[] = [];
  images: any[] = [];
  constructor(private readonly firestore: Firestore) {
    this.storageRef = ref(getStorage());
  }

  setFolderCollection(uid: string) {
    this.folderCollection = collection(this.firestore, uid);
  }

  setFolder(folder: Folder) {
    this.images = [];
    this.folder = folder;
    this.getImages();
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
  getImageURL(filepath: string) {
    const imgref = this.getImageRef(filepath);
    const downloadUrl$ = from(getDownloadURL(imgref)).pipe(
      keepUnstableUntilFirst,
      traceUntilFirst('storage'),
      startWith(TRANSPARENT_PNG),
    );
    console.log('downloadurl: ', downloadUrl$);
    return downloadUrl$;
  }
  getImageRef(filepath: string) {
    return ref(this.storageRef, filepath);
  }

  getImages() {
    for (var file of this.folder.files) {
      this.images.push(this.getImageURL(file.fullpath));
    }
  }
}
