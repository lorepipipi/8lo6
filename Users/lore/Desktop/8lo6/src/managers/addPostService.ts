import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private posts: any[] = [];

  constructor(private storage: Storage) {
    this.loadPosts();
  }

  async loadPosts() {
    const storedPosts = await this.storage.get('posts');
    this.posts = storedPosts || [];
  }

  getPosts() {
    return this.posts;
  }

  async addPost(imageUrl: string, description: string) {
    const newPost = { id: Date.now(), imageUrl, description };
    this.posts.push(newPost);
    await this.storage.set('posts', this.posts);
  }

  async updatePost(postId: number, newDescription: string, newImageUrl?: string) {
    const postIndex = this.posts.findIndex(post => post.id === postId);
    if (postIndex > -1) {
      this.posts[postIndex].description = newDescription;
      if (newImageUrl) {
        this.posts[postIndex].imageUrl = newImageUrl;
      }
      await this.storage.set('posts', this.posts);
    }
  }

  async deletePost(postId: number) {
    this.posts = this.posts.filter(post => post.id !== postId);
    await this.storage.set('posts', this.posts);
  }

  // Placeholder for selecting an image - replace with actual image picker implementation
  async selectImage(): Promise<string> {
    // Implement your image picker functionality here
    return 'path/to/selected/image.jpg';
  }

  
}
