import { Component } from '@angular/core';
import { PostService } from 'src/managers/addPostService';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.page.html',
  styleUrls: ['./add-post.page.scss'],
})
export class AddPostPage {
  description: string = '';
  imagePath: string | null = null;

  constructor(private postService: PostService) {}

  async onSelectImage() {
    this.imagePath = await this.postService.selectImage();
  }

  async onSubmitPost() {
    if (this.imagePath && this.description) {
      this.postService.addPost(this.imagePath, this.description);
      this.description = '';
      this.imagePath = null;
      console.log('Post added successfully');
    } else {
      console.error('Please select an image and enter a description');
    }
  }
}
