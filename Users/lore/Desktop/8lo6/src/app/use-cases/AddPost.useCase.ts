// src/app/services/add-post.service.ts
import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class AddPostService {
  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore
  ) {}

  async selectImage(): Promise<string | null> {
    try {
      const photo = await Camera.getPhoto({
        quality: 80,
        source: CameraSource.Prompt,
        resultType: CameraResultType.Uri,
      });

      return photo.webPath || null;
    } catch (error) {
      console.error('Error selecting image', error);
      return null;
    }
  }

  async uploadImage(imagePath: string, description: string): Promise<void> {
    try {
      const response = await fetch(imagePath);
      const blob = await response.blob();
      const filePath = `posts/${uuidv4()}`;
      const fileRef = this.storage.ref(filePath);
      await fileRef.put(blob);

      const downloadURL = await fileRef.getDownloadURL().toPromise();

      await this.firestore.collection('posts').add({
        imageUrl: downloadURL,
        description: description,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error('Error uploading image', error);
    }
  }
}
