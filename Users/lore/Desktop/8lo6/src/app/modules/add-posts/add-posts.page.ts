// src/app/pages/add-post/add-post.page.ts
import { Component } from '@angular/core';
import { AddPostService } from 'src/app/use-cases/AddPost.useCase';

@Component({
  selector: 'app-add-posts',
  templateUrl: './add-posts.page.html',
  styleUrls: ['./add-posts.page.scss'],
})
export class AddPostPage {
  description: string = '';
  imagePath: string | null = null;

  constructor(private addPostService: AddPostService) {}

  async onSelectImage() {
    this.imagePath = await this.addPostService.selectImage();
  }

  async onSubmitPost() {
    if (this.imagePath && this.description) {
      await this.addPostService.uploadImage(this.imagePath, this.description);
      this.description = '';
      this.imagePath = null;
      console.log('Post added successfully');
    } else {
      console.error('Please select an image and enter a description');
    }
  }
}
