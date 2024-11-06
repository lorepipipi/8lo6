import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddPostPage } from './add-posts.page';
import { RouterModule } from '@angular/router';
import { PostService } from 'src/managers/addPostService';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: AddPostPage }]),
  ],
  declarations: [AddPostPage],
  providers: [PostService] // Agrega PostService aquí
})
export class AddPostPageModule {}
